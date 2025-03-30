import React, { useState } from 'react';
import { AlertCircle, Ambulance, Phone, MapPin } from 'lucide-react';

export const EmergencyButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [dispatching, setDispatching] = useState(false);

  const handleEmergency = () => {
    setDispatching(true);
    // Simulate emergency dispatch
    setTimeout(() => {
      setDispatching(false);
      alert('Emergency services have been dispatched to your location. ETA: 5 minutes');
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 animate-pulse"
      >
        <AlertCircle size={20} />
        Emergency
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="terminal-card w-full max-w-md relative border-red-500/50">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-red-500 text-white px-6 py-1 rounded-full flex items-center gap-2">
                <AlertCircle size={16} />
                Emergency Alert
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-red-500 mb-2">
                Dispatch Emergency Services
              </h2>
              <p className="text-gray-400">
                This will immediately dispatch emergency services to your location
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Ambulance className="text-red-500" size={20} />
                <span>Ambulance & Medical Team</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="text-red-500" size={20} />
                <span>Location tracking enabled</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="text-red-500" size={20} />
                <span>Emergency contact notification</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn btn-outline border-red-500/50 text-red-500 hover:bg-red-500/10"
              >
                Cancel
              </button>
              <button
                onClick={handleEmergency}
                disabled={dispatching}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
              >
                {dispatching ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></span>
                    Dispatching...
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} />
                    Dispatch Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};