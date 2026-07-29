// CaptivePortal.tsx
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, CheckCircle, AlertCircle, Clock, Users, Shield, X } from 'lucide-react';

interface CaptivePortalProps {
  onAuthenticate?: (data: AuthData) => void;
  onSkip?: () => void;
  portalConfig?: PortalConfig;
}

interface AuthData {
  name: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
}

interface PortalConfig {
  networkName: string;
  maxDevices: number;
  sessionDuration: number; // in minutes
  requiresEmail: boolean;
  requiresPhone: boolean;
  customMessage?: string;
  primaryColor?: string;
}

const defaultConfig: PortalConfig = {
  networkName: 'Guest WiFi',
  maxDevices: 10,
  sessionDuration: 60,
  requiresEmail: true,
  requiresPhone: true,
  customMessage: 'Welcome! Please accept the terms to access free WiFi.',
  primaryColor: '#3B82F6',
};

const CaptivePortal: React.FC<CaptivePortalProps> = ({ 
  onAuthenticate, 
  onSkip,
  portalConfig = defaultConfig 
}) => {
  const [formData, setFormData] = useState<AuthData>({
    name: '',
    email: '',
    phone: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Partial<AuthData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreementType, setAgreementType] = useState<'terms' | 'privacy'>('terms');
  const [showAgreement, setShowAgreement] = useState(false);

  const config = { ...defaultConfig, ...portalConfig };

  // Auto-connect simulation
  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem('wifi_authenticated');
    if (isAuthenticated === 'true') {
      // Auto-redirect or show connected state
    }
  }, []);

  const validateField = (name: string, value: string | boolean): string => {
    if (name === 'name' && typeof value === 'string' && value.trim().length < 2) {
      return 'Name is required';
    }
    if (name === 'email' && typeof value === 'string' && config.requiresEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Valid email is required';
      }
    }
    if (name === 'phone' && typeof value === 'string' && config.requiresPhone) {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(value)) {
        return 'Valid phone number is required';
      }
    }
    if (name === 'acceptTerms' && !value) {
      return 'You must accept the terms to continue';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    // Clear error when user starts typing
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Partial<AuthData> = {};
    const fieldsToValidate = ['name', 'acceptTerms'];
    if (config.requiresEmail) fieldsToValidate.push('email');
    if (config.requiresPhone) fieldsToValidate.push('phone');
    
    fieldsToValidate.forEach(field => {
      const value = formData[field as keyof AuthData];
      const error = validateField(field, value);
      if (error) {
        newErrors[field as keyof AuthData] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save authentication state
      localStorage.setItem('wifi_authenticated', 'true');
      localStorage.setItem('wifi_user', JSON.stringify({
        name: formData.name,
        timestamp: new Date().toISOString(),
        expiry: new Date(Date.now() + config.sessionDuration * 60000).toISOString(),
      }));

      if (onAuthenticate) {
        onAuthenticate(formData);
      }

      // Show success and redirect
      // You can add redirect logic here
      console.log('Authentication successful');
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wifi className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">{config.networkName}</h1>
                <p className="text-blue-100 text-sm">Secure WiFi Network</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
              <Users className="w-4 h-4 inline mr-1" />
              {config.maxDevices} devices
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-6 py-3 bg-green-50 border-b border-green-100 flex items-center justify-between">
          <div className="flex items-center text-green-700">
            <Wifi className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Connected</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{config.sessionDuration} min session</span>
          </div>
        </div>

        <div className="p-6">
          {/* Welcome Message */}
          <div className="mb-6">
            <p className="text-gray-600">{config.customMessage}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
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

            {/* Email Field - Conditional */}
            {config.requiresEmail && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            )}

            {/* Phone Field - Conditional */}
            {config.requiresPhone && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  placeholder="+1 (555) 000-0000"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="space-y-2">
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

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  'Connect to WiFi'
                )}
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
                disabled={isSubmitting}
              >
                Skip for now (limited access)
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            <Shield className="w-3 h-3 inline mr-1" />
            Secure connection • Your data is protected
          </p>
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