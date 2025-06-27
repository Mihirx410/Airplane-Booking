import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ open, onClose }) {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">Login Required</h2>
        <p className="mb-6 text-[var(--muted-text)]">You must be logged in to book a flight or view your bookings.</p>
        <button
          onClick={() => { onClose(); navigate('/login'); }}
          className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
} 