import React from 'react';

const testimonials = [
  {
    name: 'Ava Smith',
    quote: 'Booking my flight was so easy and fast! Highly recommend.',
    rating: 5,
  },
  {
    name: 'Liam Chen',
    quote: 'Great prices and excellent customer support.',
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center">
            <div className="mb-2 text-yellow-400 text-xl">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
            <p className="italic mb-4">“{t.quote}”</p>
            <span className="font-bold">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 