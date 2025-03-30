import React from 'react';

const stats = [
  { label: 'Emergencies Assisted', value: '100,000+' },
  { label: 'Response Time', value: '< 1s' },
  { label: 'Medical Professionals', value: '10,000+' },
  { label: 'Success Rate', value: '99.9%' },
];

export const Stats = () => {
  return (
    <div id="proof" className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-[#c7af8c] mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};