import React, { useState, useCallback, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from './HeroSection';
import BookingFormSection from './BookingFormSection';
import BenefitsSection from './BenefitsSection';
import DealsSection from './DealsSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import MyBookingsSection from './MyBookingsSection';
import FooterSection from './FooterSection';
import LoginModal from '../components/LoginModal';
import axios from 'axios';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState('');

  const refreshBookings = useCallback(async () => {
    setBookingsLoading(true);
    setBookingsError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setBookings([]);
      setBookingsLoading(false);
      return;
    }
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.bookings || []);
    } catch (err) {
      setBookingsError(err.response?.data?.message || 'Failed to fetch bookings.');
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  return (
    <div className="bg-[var(--bg-color)] text-[var(--text-color)] font-sans">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <div className="pt-20">
        <HeroSection />
        <BookingFormSection onRequireLogin={() => setShowLogin(true)} onBookingSuccess={refreshBookings} />
        <BenefitsSection />
        <DealsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <MyBookingsSection
          onRequireLogin={() => setShowLogin(true)}
          bookings={bookings}
          loading={bookingsLoading}
          error={bookingsError}
          onBookingChange={refreshBookings}
        />
        <FooterSection />
      </div>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
} 