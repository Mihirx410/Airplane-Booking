import React, { useState } from 'react';
import axios from 'axios';

export default function BookingFormSection({ onRequireLogin = () => {}, onBookingSuccess = () => {} }) {
  const [form, setForm] = useState({ from: '', to: '', date: '', passengers: 1 });
  const [formMsg, setFormMsg] = useState('');
  const [formMsgType, setFormMsgType] = useState('success');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    const token = localStorage.getItem('token');
    if (!token) {
      onRequireLogin();
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormMsgType('success');
      setFormMsg('Booking successful!');
      setForm({ from: '', to: '', date: '', passengers: 1 });
      onBookingSuccess();
    } catch (err) {
      setFormMsgType('error');
      setFormMsg(err.response?.data?.message || 'Booking failed.');
    }
    setTimeout(() => setFormMsg(''), 3000);
  };

  return (
    <section id="booking" className="relative z-20 -mt-20 flex flex-col items-center justify-center">
      {formMsg && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-center transition-all
          ${formMsgType === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}
        >
          {formMsg}
        </div>
      )}
      <form onSubmit={handleFormSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center">
        <input name="from" value={form.from} onChange={handleFormChange} required placeholder="From" className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] outline-none" />
        <input name="to" value={form.to} onChange={handleFormChange} required placeholder="To" className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] outline-none" />
        <input name="date" value={form.date} onChange={handleFormChange} required type="date" className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] outline-none" />
        <input name="passengers" value={form.passengers} onChange={handleFormChange} required type="number" min="1" max="9" className="w-20 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] outline-none" />
        <button type="submit" className="px-6 py-3 rounded-lg bg-[var(--accent-color)] text-white font-bold shadow hover:bg-yellow-400 transition">Book Flight</button>
      </form>
    </section>
  );
} 