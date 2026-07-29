// CaptivePortal.tsx
import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Users, 
  Shield, 
  X, 
  CreditCard,
  Smartphone,
  Zap,
  Crown,
  DollarSign,
  Loader2,
  Phone,
  Mail,
  User,
  Key,
  Timer
} from 'lucide-react';

interface CaptivePortalProps {
  onAuthenticate?: (data: AuthData) => void;
  onPaymentSuccess?: (data: PaymentData) => void;
  portalConfig?: PortalConfig;
  mpesaConfig?: MpesaConfig;
}

interface AuthData {
  name: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
  selectedSession: SessionPlan;
}

interface PaymentData {
  transactionId: string;
  amount: number;
  phone: string;
  session: SessionPlan;
  status: 'pending' | 'completed' | 'failed';
}

interface SessionPlan {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  dataLimit?: number; // in MB, optional
  speed?: string;
  popular?: boolean;
  icon?: React.ReactNode;
}

interface PortalConfig {
  networkName: string;
  maxDevices: number;
  currency: string;
  currencySymbol: string;
  customMessage?: string;
  primaryColor?: string;
  businessName?: string;
  supportPhone?: string;
}

interface MpesaConfig {
  businessShortCode: string;
  passkey: string;
  callbackUrl: string;
  accountReference: string;
  transactionDesc: string;
}

const defaultSessions: SessionPlan[] = [
  {
    id: '1',
    name: 'Quick Connect',
    duration: 30,
    price: 50,
    dataLimit: 100,
    speed: '2 Mbps',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: '2',
    name: 'Standard',
    duration: 120,
    price: 150,
    dataLimit: 500,
    speed: '5 Mbps',
    popular: true,
    icon: <Wifi className="w-5 h-5" />
  },
  {
    id: '3',
    name: 'Premium',
    duration: 480,
    price: 500,
    dataLimit: 2000,
    speed: '10 Mbps',
    icon: <Crown className="w-5 h-5" />
  },
  {
    id: '4',
    name: 'Day Pass',
    duration: 1440,
    price: 1000,
    dataLimit: 5000,
    speed: '15 Mbps',
    icon: <Clock className="w-5 h-5" />
  }
];

const defaultConfig: PortalConfig = {
  networkName: 'Guest WiFi',
  maxDevices: 10,
  currency: 'KES',
  currencySymbol: 'KSh',
  customMessage: 'Welcome! Select a session and pay via M-Pesa to access high-speed WiFi.',
  businessName: 'WiFi Services',
  supportPhone: '+254700000000'
};

const CaptivePortal: React.FC<CaptivePortalProps> = ({ 
  onAuthenticate,
  onPaymentSuccess,
  portalConfig = defaultConfig,
  mpesaConfig
}) => {
  const [step, setStep] = useState<'welcome' | 'payment' | 'processing' | 'success' | 'error'>('welcome');
  const [formData, setFormData] = useState<AuthData>({
    name: '',
    email: '',
    phone: '',
    acceptTerms: false,
    selectedSession: defaultSessions[1]
  });
  const [errors, setErrors] = useState<Partial<AuthData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [agreementType, setAgreementType] = useState<'terms' | 'privacy'>('terms');
  const [showAgreement, setShowAgreement] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const config = { ...defaultConfig, ...portalConfig };
  const sessions = defaultSessions;

  // Simulate M-Pesa STK Push
  const simulateMpesaPayment = async (phone: string, amount: number, session: SessionPlan) => {
    // In production, this would call your backend API
    // which would then initiate the STK Push to the user's phone
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          transactionId: `MPESA${Date.now()}`,
          status: 'completed',
          message: 'Payment successful'
        });
      }, 3000);
    });
  };

  const validateField = (name: string, value: string | boolean): string => {
    if (name === 'name' && typeof value === 'string' && value.trim().length < 2) {
      return 'Full name is required';
    }
    if (name === 'email' && typeof value === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && value.length > 0) {
        return 'Valid email is required';
      }
    }
    if (name === 'phone' && typeof value === 'string') {
      // Kenyan phone number format
      const phoneRegex = /^(254|0)[7-9][0-9]{8}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        return 'Valid Kenyan phone number is required (e.g., 0712345678)';
      }
    }
    if (name === 'acceptTerms' && !value) {
      return 'You must accept the terms to continue';
    }
    if (name === 'selectedSession' && !value) {
      return 'Please select a session plan';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (errors[name as keyof AuthData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    const error = validateField(name, val);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const selectSession = (session: SessionPlan) => {
    setFormData(prev => ({ ...prev, selectedSession: session }));
    setErrors(prev => ({ ...prev, selectedSession: '' }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<AuthData> = {};
    const fieldsToValidate = ['name', 'phone', 'acceptTerms', 'selectedSession'];
    
    fieldsToValidate.forEach(field => {
      const value = formData[field as keyof AuthData];
      const error = validateField(field, value);
      if (error) {
        newErrors[field as keyof AuthData] = error;
      }
    });

    // Validate email if provided
    if (formData.email && !validateField('email', formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed to payment
    setStep('processing');
    setIsSubmitting(true);

    try {
      // Format phone number for M-Pesa (remove leading 0, add 254)
      let phoneNumber = formData.phone.replace(/\s/g, '');
      if (phoneNumber.startsWith('0')) {
        phoneNumber = '254' + phoneNumber.substring(1);
      } else if (!phoneNumber.startsWith('254')) {
        phoneNumber = '254' + phoneNumber;
      }

      // Simulate M-Pesa payment
      const paymentResult = await simulateMpesaPayment(
        phoneNumber,
        formData.selectedSession.price,
        formData.selectedSession
      );

      const paymentInfo: PaymentData = {
        transactionId: (paymentResult as any).transactionId,
        amount: formData.selectedSession.price,
        phone: phoneNumber,
        session: formData.selectedSession,
        status: 'completed'
      };

      setPaymentData(paymentInfo);
      
      // Save authentication state
      localStorage.setItem('wifi_authenticated', 'true');
      localStorage.setItem('wifi_user', JSON.stringify({
        name: formData.name,
        phone: phoneNumber,
        email: formData.email,
        session: formData.selectedSession,
        transactionId: paymentInfo.transactionId,
        timestamp: new Date().toISOString(),
        expiry: new Date(Date.now() + formData.selectedSession.duration * 60000).toISOString(),
      }));

      if (onPaymentSuccess) {
        onPaymentSuccess(paymentInfo);
      }

      if (onAuthenticate) {
        onAuthenticate(formData);
      }

      setStep('success');
      
      // Start countdown for auto-redirect
      setCountdown(10);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Redirect to internet or dashboard
            window.location.href = 'https://www.google.com';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Payment failed:', error);
      setStep('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderWelcomeStep = () => (
    <div className="text-center py-8">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Wifi className="w-12 h-12 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to {config.networkName}</h2>
      <p className="text-gray-600 mb-6">{config.customMessage}</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-700">Up to {config.maxDevices} Devices</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-700">Secure Connection</p>
        </div>
      </div>
      <button
        onClick={() => setStep('payment')}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
      >
        Get Started
      </button>
    </div>
  );

  const renderPaymentStep = () => (
    <form onSubmit={handlePayment} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-600" />
          Personal Information
        </h3>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (M-Pesa) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="0712345678"
              disabled={isSubmitting}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">You'll receive an M-Pesa prompt on this number</p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Session Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
          <Timer className="w-5 h-5 mr-2 text-blue-600" />
          Select Your Session
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => selectSession(session)}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                formData.selectedSession?.id === session.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              {session.popular && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1">
                    {session.icon}
                    <span className="font-semibold text-gray-800">{session.name}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {session.duration < 60 ? `${session.duration} min` : `${session.duration / 60} hours`}
                    </div>
                    {session.dataLimit && (
                      <div className="flex items-center">
                        <Wifi className="w-3 h-3 mr-1" />
                        {session.dataLimit} MB
                      </div>
                    )}
                    {session.speed && (
                      <div className="text-xs text-gray-500">{session.speed}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">
                    {config.currencySymbol} {session.price}
                  </div>
                </div>
              </div>
              {formData.selectedSession?.id === session.id && (
                <CheckCircle className="absolute bottom-2 right-2 w-4 h-4 text-blue-600" />
              )}
            </div>
          ))}
        </div>
        {errors.selectedSession && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.selectedSession}
          </p>
        )}
      </div>

      {/* Terms and M-Pesa Info */}
      <div className="space-y-3">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-start">
            <Smartphone className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-green-800 font-medium">M-Pesa Payment</p>
              <p className="text-xs text-green-700">
                You'll receive an STK Push on your phone. Enter your M-Pesa PIN to complete payment.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
            I accept the{' '}
            <button
              type="button"
              onClick={() => {
                setAgreementType('terms');
                setShowAgreement(true);
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Terms of Service
            </button>
            {' '}and{' '}
            <button
              type="button"
              onClick={() => {
                setAgreementType('privacy');
                setShowAgreement(true);
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Privacy Policy
            </button>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.acceptTerms}
          </p>
        )}
      </div>

      {/* Payment Button */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Pay {config.currencySymbol} {formData.selectedSession.price} via M-Pesa
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={() => setStep('welcome')}
          className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
          disabled={isSubmitting}
        >
          Back
        </button>
      </div>
    </form>
  );

  const renderProcessingStep = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h3>
      <p className="text-gray-600 mb-2">Please check your phone for the M-Pesa prompt</p>
      <p className="text-sm text-gray-500">Enter your PIN to complete the transaction</p>
      <div className="mt-6 bg-blue-50 p-4 rounded-lg max-w-xs mx-auto">
        <div className="flex items-center justify-center space-x-4">
          <Smartphone className="w-6 h-6 text-blue-600" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-700">Amount:</p>
            <p className="text-lg font-bold text-blue-600">
              {config.currencySymbol} {formData.selectedSession.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-2">You are now connected to {config.networkName}</p>
      {paymentData && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Session:</p>
              <p className="font-medium">{paymentData.session.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Duration:</p>
              <p className="font-medium">{paymentData.session.duration} minutes</p>
            </div>
            <div>
              <p className="text-gray-500">Amount Paid:</p>
              <p className="font-medium text-green-600">{config.currencySymbol} {paymentData.amount}</p>
            </div>
            <div>
              <p className="text-gray-500">Transaction ID:</p>
              <p className="font-medium text-xs break-all">{paymentData.transactionId}</p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-center space-x-2">
          <Wifi className="w-5 h-5 text-blue-600 animate-pulse" />
          <span className="text-blue-800 font-medium">Connected</span>
          {countdown > 0 && (
            <span className="text-sm text-blue-600">(Redirecting in {countdown}s)</span>
          )}
        </div>
      </div>
      <button
        onClick={() => window.location.href = 'https://www.google.com'}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Start Browsing
      </button>
    </div>
  );

  const renderErrorStep = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-10 h-10 text-red-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Failed</h3>
      <p className="text-gray-600 mb-4">We couldn't process your payment. Please try again.</p>
      <div className="space-y-3">
        <button
          onClick={() => setStep('payment')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => setStep('welcome')}
          className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wifi className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">{config.networkName}</h1>
                <p className="text-blue-100 text-sm">{config.businessName}</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-full px-3 py-1 text-sm flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {config.maxDevices} devices
            </div>
          </div>
          {step !== 'welcome' && (
            <div className="mt-2 flex items-center text-blue-100 text-sm">
              <span className="mr-2">Step {step === 'payment' ? '1' : step === 'processing' ? '2' : '3'} of 3</span>
              <div className="flex-1 h-1 bg-blue-400 rounded ml-2">
                <div 
                  className="h-full bg-white rounded transition-all duration-500"
                  style={{ 
                    width: step === 'payment' ? '33%' : step === 'processing' ? '66%' : '100%' 
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'welcome' && renderWelcomeStep()}
          {step === 'payment' && renderPaymentStep()}
          {step === 'processing' && renderProcessingStep()}
          {step === 'success' && renderSuccessStep()}
          {step === 'error' && renderErrorStep()}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              Secure Connection
            </div>
            <div>
              {config.supportPhone && (
                <span>Support: {config.supportPhone}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Agreement Modal */}
      {showAgreement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {agreementType === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h3>
              <button
                onClick={() => setShowAgreement(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-sm">
                <h4>Agreement Content</h4>
                <p>
                  This is a sample agreement text. In a production environment, this would contain
                  your actual Terms of Service or Privacy Policy.
                </p>
                <ul>
                  <li>Acceptable use policy</li>
                  <li>Data collection practices</li>
                  <li>User responsibilities</li>
                  <li>Liability limitations</li>
                  <li>Payment terms and refunds</li>
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  Last updated: January 1, 2024
                </p>
              </div>
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => setShowAgreement(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptivePortal;