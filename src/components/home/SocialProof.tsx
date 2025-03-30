import React from 'react';
import { Quote, Shield, Award, Clock } from 'lucide-react';

const testimonials = [
  {
    quote: "ResQ.ai's approach to emergency care with AI assistance shows tremendous potential for improving outcomes during critical situations.",
    name: "Dr. Sarah Chen",
    title: "Emergency Medicine Specialist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    quote: "The multi-modal assistance approach to emergency response could significantly reduce response times and improve first aid delivery.",
    name: "James Rodriguez",
    title: "Healthcare Consultant",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    quote: "Integrating AI guidance into emergency response is a promising approach to addressing critical healthcare gaps.",
    name: "Dr. Michael Patel",
    title: "Emergency Medicine Researcher",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

const metrics = [
  {
    icon: Shield,
    value: "99.9%",
    label: "AI Accuracy Rate"
  },
  {
    icon: Clock,
    value: "< 1s",
    label: "Response Time"
  },
  {
    icon: Award,
    value: "5M+",
    label: "Annual Cases"
  }
];

export const SocialProof = () => {
  return (
    <section className="py-24 bg-black" id="testimonials">
      <div className="max-w-7xl mx-auto px-4">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {metrics.map((metric) => (
            <div key={metric.label} className="terminal-card text-center group hover:border-[#c7af8c] transition-all duration-300">
              <metric.icon className="mx-auto text-[#c7af8c] mb-4" size={32} />
              <div className="text-3xl font-bold text-[#c7af8c] mb-2">{metric.value}</div>
              <div className="text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-[#c7af8c]">Expert Perspectives</span> on Emergency Response
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="terminal-card group hover:border-[#c7af8c] transition-all duration-300">
              <Quote className="text-[#c7af8c] mb-4 opacity-50 group-hover:opacity-100 transition-opacity" size={32} />
              <p className="text-gray-300 mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#c7af8c]/20"
                />
                <div>
                  <h4 className="text-[#c7af8c] font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};