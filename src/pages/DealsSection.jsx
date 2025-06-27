import React from 'react';

const deals = [
  { city: 'Paris', price: 299, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', code: 'CDG' },
  { city: 'Tokyo', price: 499, img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', code: 'HND' },
  { city: 'New York', price: 199, img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80', code: 'JFK' },
  { city: 'Sydney', price: 599, img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80', code: 'SYD' },
];

export default function DealsSection() {
  return (
    <section id="deals" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Popular Destinations & Deals</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {deals.map((d) => (
          <div key={d.city} className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition">
            <img src={d.img} alt={d.city} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute top-3 left-3 bg-white/80 rounded-full px-4 py-1 text-[var(--primary-color)] font-bold text-sm shadow">{d.city} <span className="text-xs text-gray-400">({d.code})</span></div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col items-start">
              <span className="text-white text-lg font-bold drop-shadow">${d.price}</span>
              <span className="text-xs text-white/80 mt-1">Round Trip • Taxes Included</span>
            </div>
            <div className="absolute top-3 right-3 bg-[var(--accent-color)] text-white px-3 py-1 rounded-full text-xs font-semibold shadow">Deal</div>
            <div className="absolute inset-0 group-hover:bg-black/10 transition" />
          </div>
        ))}
      </div>
    </section>
  );
} 