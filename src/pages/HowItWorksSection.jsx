import React from 'react';

const steps = [
  { title: 'Search', desc: 'Find flights to your dream destination.', icon: '🔍' },
  { title: 'Book', desc: 'Reserve your seat in just a few clicks.', icon: '📝' },
  { title: 'Fly', desc: 'Enjoy your journey with peace of mind.', icon: '✈️' },
];

export default function HowItWorksSection() {
  return (
    <section id="howitworks" className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">How it Works</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {steps.map((s, i) => (
          <div key={s.title} className="flex-1 flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[var(--primary-color)] relative">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-3xl font-bold mb-4 shadow-lg border-4 border-white -mt-12 z-10">{s.icon}</div>
            <div className="absolute top-2 left-2 bg-[var(--accent-color)] text-white rounded-full px-3 py-1 text-xs font-bold shadow">Step {i + 1}</div>
            <h4 className="font-bold text-xl mb-2 mt-2">{s.title}</h4>
            <p className="text-[var(--muted-text)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 