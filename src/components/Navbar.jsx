import React from 'react';
import { useNavigate } from 'react-router-dom';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Navbar({ onLoginClick }) {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-30">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}> 
        <span className="text-[var(--primary-color)] font-extrabold text-2xl tracking-tight">✈️ Airplane</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#deals" onClick={e => { e.preventDefault(); scrollToSection('deals'); }} className="text-[var(--muted-text)] hover:text-[var(--primary-color)] font-medium hidden sm:inline">Deals</a>
        <a href="#how" onClick={e => { e.preventDefault(); scrollToSection('howitworks'); }} className="text-[var(--muted-text)] hover:text-[var(--primary-color)] font-medium hidden sm:inline">How it Works</a>
        <a href="#testimonials" onClick={e => { e.preventDefault(); scrollToSection('testimonials'); }} className="text-[var(--muted-text)] hover:text-[var(--primary-color)] font-medium hidden sm:inline">Testimonials</a>
        {isLoggedIn ? (
          <>
            <button onClick={() => scrollToSection('mybookings')} className="text-[var(--primary-color)] font-semibold">My Bookings</button>
            <button onClick={handleLogout} className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Logout</button>
          </>
        ) : (
          <>
            <button onClick={onLoginClick} className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Login</button>
            <button onClick={onLoginClick} className="bg-[var(--accent-color)] text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
} 