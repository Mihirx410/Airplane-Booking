import React from 'react';

const benefits = [
  {
    title: 'Easy Booking',
    desc: 'Book flights in just a few clicks with our intuitive interface.',
    icon: '🛫',
  },
  {
    title: 'Best Prices',
    desc: 'Get the best deals and exclusive offers on every booking.',
    icon: '💸',
  },
  {
    title: '24/7 Support',
    desc: 'Our team is here to help you anytime, anywhere.',
    icon: '📞',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
      {benefits.map((b) => (
        <div key={b.title} className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center">
          <div className="text-4xl mb-4">{b.icon}</div>
          <h3 className="font-bold text-xl mb-2">{b.title}</h3>
          <p className="text-[var(--muted-text)]">{b.desc}</p>
        </div>
      ))}
    </section>
  );
} 