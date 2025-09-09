// src/pages/AdminBookings.jsx
import BookingList from '../components/admin/BookingList';
import { useState, useEffect } from 'react';

const AdminBookings = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgroundImages = [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50fc2cf7?auto=format&fit=crop&w=2070&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
      ></div>
      <div className="fixed inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
          </div>
          <BookingList />
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
