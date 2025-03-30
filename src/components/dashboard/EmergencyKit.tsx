import React, { useState } from 'react';
import { ShoppingCart, Clock, Truck, Shield } from 'lucide-react';

interface Kit {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  image: string;
}

const emergencyKits: Kit[] = [
  {
    id: 'basic',
    name: 'Basic First Aid Kit',
    price: 49.99,
    description: 'Essential first aid supplies for common emergencies',
    items: [
      'Bandages and gauze',
      'Antiseptic wipes',
      'Medical tape',
      'Scissors',
      'Pain relievers',
      'First aid guide'
    ],
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'advanced',
    name: 'Advanced Emergency Kit',
    price: 99.99,
    description: 'Comprehensive emergency supplies with medications',
    items: [
      'All Basic Kit items',
      'Blood pressure monitor',
      'Emergency medications',
      'Splints',
      'Emergency blanket',
      'CPR mask'
    ],
    image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'professional',
    name: 'Professional Medical Kit',
    price: 199.99,
    description: 'Professional-grade emergency response equipment',
    items: [
      'All Advanced Kit items',
      'Automated External Defibrillator',
      'Oxygen supply',
      'Advanced medications',
      'Trauma supplies',
      'Medical reference guides'
    ],
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=300'
  }
];

export const EmergencyKit = () => {
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);

  const handleOrder = (kit: Kit) => {
    setSelectedKit(kit);
    // Implement order processing logic here
    alert(`Emergency Kit "${kit.name}" will be delivered within 10 minutes to your location.`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-accent mb-2">Emergency Kits</h2>
        <p className="text-gray-400">10-Minute Emergency Delivery to Your Location</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {emergencyKits.map((kit) => (
          <div key={kit.id} className="terminal-card group">
            <img
              src={kit.image}
              alt={kit.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-accent mb-2">{kit.name}</h3>
            <p className="text-gray-400 mb-4">{kit.description}</p>
            <div className="space-y-2 mb-4">
              {kit.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield size={14} className="text-accent" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-accent/20">
              <span className="text-2xl font-bold text-accent">${kit.price}</span>
              <button
                onClick={() => handleOrder(kit)}
                className="btn btn-primary flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="terminal-card text-center">
          <Clock className="text-accent mx-auto mb-4" size={32} />
          <h3 className="text-lg font-bold text-accent mb-2">10-Minute Delivery</h3>
          <p className="text-gray-400">Emergency kits delivered to your location within 10 minutes</p>
        </div>
        <div className="terminal-card text-center">
          <Truck className="text-accent mx-auto mb-4" size={32} />
          <h3 className="text-lg font-bold text-accent mb-2">24/7 Availability</h3>
          <p className="text-gray-400">Round-the-clock emergency delivery service</p>
        </div>
        <div className="terminal-card text-center">
          <Shield className="text-accent mx-auto mb-4" size={32} />
          <h3 className="text-lg font-bold text-accent mb-2">Quality Assured</h3>
          <p className="text-gray-400">Medical-grade equipment and certified medications</p>
        </div>
      </div>
    </div>
  );
};