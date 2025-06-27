import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-4 pt-12 pb-24 bg-gradient-to-br from-blue-100 to-blue-50">
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Airplane" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-[var(--primary-color)] drop-shadow">Book Your Next Adventure</h1>
        <p className="mb-8 text-lg md:text-xl text-[var(--muted-text)]">Fast, easy, and affordable flight booking for everyone.</p>
        <a href="#booking" className="inline-block px-8 py-3 rounded-full bg-[var(--primary-color)] text-white font-semibold shadow hover:bg-blue-700 transition">Book a Flight</a>
      </div>
    </section>
  );
} 