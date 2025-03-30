import React, { useState } from 'react';
import { Check, Zap, Building2, User, Settings, Stethoscope, Plus, Phone, Mail, Instagram } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { createCheckoutSession, stripePromise } from '../../lib/stripe';

const plans = [
  {
    name: 'RescueMed',
    subtitle: 'For Medical Professionals',
    price: '29',
    priceId: 'price_H5ggYwtDq5YPwb',
    description: 'Advanced features for healthcare providers',
    features: [
      'Advanced triage support with AI-guided protocols',
      'Direct hospital bed reservation system',
      'Multi-patient emergency management dashboard',
      'PHC "dark store" access for emergency supplies',
      'Priority teleconsultation with specialists',
      'Equipment failure alerts for critical devices',
      'Customizable AI avatar for patient education'
    ],
    icon: Stethoscope,
    popular: true,
  },
  {
    name: 'RescueLay',
    subtitle: 'For General Public',
    price: '9',
    priceId: 'price_H5ggYwtDq5YPwb',
    description: 'Essential emergency response for individuals',
    features: [
      '3-tier emergency AI assistance (Text/Voice/Avatar)',
      'Golden Hour Protocol with ambulance dispatch',
      '10-minute emergency kit delivery guarantee',
      'PHC stabilization priority routing',
      'Basic teleconsultation (3 free/month)',
      'Family emergency profiles (up to 5 members)',
      'Dental emergency first-response guidance'
    ],
    icon: User
  },
  {
    name: 'RescueTech',
    subtitle: 'For Equipment Management',
    price: '39',
    priceId: 'price_H5ggYwtDq5YPwb',
    description: 'Comprehensive equipment monitoring & management',
    features: [
      'Real-time medical equipment monitoring',
      'Predictive maintenance alerts',
      'Automated PHC dark store replenishment',
      'Emergency technician dispatch within 30 mins',
      'AI-powered repair guidance overlay (AR supported)',
      'Hospital-wide equipment heatmaps',
      'Supply chain integration'
    ],
    icon: Settings
  },
  {
    name: 'RescueDent',
    subtitle: 'For Dental Emergencies',
    price: '19',
    priceId: 'price_H5ggYwtDq5YPwb',
    description: 'Specialized dental emergency response',
    features: [
      'Tooth preservation guidance via AI avatar',
      'Emergency dental clinic mapping',
      '24/7 video consult with dental surgeons',
      'Custom trauma splint creation guides',
      'Pain management protocol assistance',
      'Dental supply delivery (temporary fillings)',
      'Specialist referral network'
    ],
    icon: Building2
  }
];

const addOns = [
  {
    name: 'RescueKit Express',
    price: '5',
    description: 'Guaranteed 10-minute delivery of emergency supplies',
    features: [
      'Basic trauma kit',
      'AED device + tutorial',
      'Emergency medications',
      'Dental preservation pack'
    ]
  },
  {
    name: 'PHC Prime Network',
    price: '7',
    description: 'Priority access to 30,000+ PHCs',
    features: [
      'Emergency stabilization points',
      'Medical supply hubs',
      'Temporary equipment banks',
      'Priority treatment access'
    ]
  },
  {
    name: 'Golden Hour+',
    price: '15',
    description: 'Enhanced emergency transport and coordination',
    features: [
      'Air ambulance coordination',
      'Blood product pre-positioning',
      'Police-green corridor facilitation',
      'Specialist en-route consultation'
    ]
  }
];

export const Pricing = () => {
  const { user } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showAddOns, setShowAddOns] = useState(false);

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!user) {
      // Show auth modal or redirect to sign in
      alert('Please sign in to subscribe');
      return;
    }

    setSelectedPlan(planName);
    setShowAddOns(true);

    if (!priceId) {
      // Handle free plan or enterprise contact
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const session = await createCheckoutSession(priceId);
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="pricing" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-blue-400 text-transparent bg-clip-text">Subscription Plans</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Choose the plan that fits your emergency response needs. All plans include access to our cutting-edge AI assistance during critical medical situations.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#c7af8c]/10 px-4 py-2 rounded-full">
            <img
              src="https://orocare.live/logo.png"
              alt="OroCare"
              className="h-6 w-6 rounded-full"
            />
            <span className="text-sm text-[#c7af8c]">Powered by OroCare AI</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`terminal-card relative hover-glow transition-all duration-300 ${
                plan.popular ? 'border-[#c7af8c]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#c7af8c] text-[#000913] text-sm px-4 py-1 rounded-full flex items-center gap-1">
                    <Zap size={14} />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {plan.icon && <plan.icon size={28} className="text-[#c7af8c]" />}
                </div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{plan.subtitle}</p>
                <div className="text-4xl font-bold text-[#c7af8c] mb-2">
                  ${plan.price}
                  <span className="text-sm text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="text-[#c7af8c] flex-shrink-0" size={16} />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan.priceId, plan.name)}
                className={`w-full mt-8 btn ${
                  plan.popular ? 'btn-primary' : 'btn-outline'
                }`}
              >
                Get Started →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Add-On Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <div key={addon.name} className="terminal-card hover-glow">
                <div className="flex items-center mb-4">
                  <Plus className="text-[#c7af8c] mr-2" size={18} />
                  <h4 className="text-lg font-semibold">{addon.name}</h4>
                </div>
                <p className="text-xl font-bold text-[#c7af8c] mb-2">
                  +${addon.price}<span className="text-sm text-gray-400">/month</span>
                </p>
                <p className="text-gray-400 text-sm mb-4">{addon.description}</p>
                <div className="space-y-2">
                  {addon.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="text-[#c7af8c] mt-1 flex-shrink-0" size={14} />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 btn btn-outline-sm">Add to Plan</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="terminal-card">
            <h3 className="text-xl font-bold mb-4">Smart Triage System</h3>
            <p className="text-gray-400 mb-4">Our AI cross-references multiple data points to provide the most effective emergency response:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="text-[#c7af8c] mt-1" size={16} />
                <span className="text-gray-300">Patient medical history</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-[#c7af8c] mt-1" size={16} />
                <span className="text-gray-300">Live vital signs from wearables</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-[#c7af8c] mt-1" size={16} />
                <span className="text-gray-300">Nearest PHC inventory levels</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-[#c7af8c] mt-1" size={16} />
                <span className="text-gray-300">Ambulance ETA & optimal routing</span>
              </li>
            </ul>
          </div>
          <div className="terminal-card">
            <h3 className="text-xl font-bold mb-4">RescueChain Integration</h3>
            <p className="text-gray-400 mb-4">Blockchain-tracked emergency response system ensures transparency and accountability:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="text-[#c7af8c] mt-1" size={16} />
                <span className="text-gray-300">Ambulance routes & response times</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-[#c7af8c] mt-1" size={16} />
                <span className="text-gray-300">Medical supply provenance</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-[#c7af8c] mt-1" size={16} />
                <span className="text-gray-300">Emergency protocol adherence</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-[#c7af8c] mt-1" size={16} />
                <span className="text-gray-300">Transparent billing & insurance claims</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">Have questions about our subscription plans or need a custom solution for your organization? Reach out to our team.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:omgurram14@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 bg-[#c7af8c]/10 rounded-full hover:bg-[#c7af8c]/20 transition-colors">
              <Mail size={18} className="text-[#c7af8c]" />
              <span className="text-gray-300">omgurram14@gmail.com</span>
            </a>
            <a href="tel:+919405659924" className="inline-flex items-center gap-2 px-4 py-2 bg-[#c7af8c]/10 rounded-full hover:bg-[#c7af8c]/20 transition-colors">
              <Phone size={18} className="text-[#c7af8c]" />
              <span className="text-gray-300">+91 9405659924</span>
            </a>
            <a href="https://t.me/theantideather" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#c7af8c]/10 rounded-full hover:bg-[#c7af8c]/20 transition-colors">
              <Mail size={18} className="text-[#c7af8c]" />
              <span className="text-gray-300">@theantideather</span>
            </a>
            <a href="https://www.instagram.com/orocare.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#c7af8c]/10 rounded-full hover:bg-[#c7af8c]/20 transition-colors">
              <Instagram size={18} className="text-[#c7af8c]" />
              <span className="text-gray-300">@orocare.ai</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};