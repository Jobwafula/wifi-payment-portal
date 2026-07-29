import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PricingDetail: React.FC = () => {
  const { plan } = useParams();
  const navigate = useNavigate();

  const plans = {
    starter: {
      name: "Starter",
      price: "K sh 1,500",
      features: ["Up to 50 users", "Basic analytics", "Email support"],
    },
    pro: {
      name: "Pro",
      price: "K sh 4,500",
      features: ["Up to 500 users", "Advanced analytics", "Priority support", "API access"],
    },
    enterprise: {
      name: "Enterprise",
      price: "K sh 5,500",
      features: ["Unlimited users", "Custom analytics", "24/7 dedicated support", "Full API access", "SLA guaranteed"],
    },
  };

  const selectedPlan = plans[plan as keyof typeof plans];

  return (
    <div className="container mx-auto px-4 py-20">
      <button onClick={() => navigate(-1)} className="mb-8 text-green-600 hover:text-green-700">
        ← Back to Pricing
      </button>
      <h1 className="text-4xl font-bold mb-4">{selectedPlan?.name} Plan</h1>
      <p className="text-2xl font-bold text-green-600 mb-6">{selectedPlan?.price}/mo</p>
      <ul className="space-y-3">
        {selectedPlan?.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-green-500">✓</span> {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingDetail;