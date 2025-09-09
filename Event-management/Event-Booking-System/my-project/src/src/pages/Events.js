import EventSearch from '../components/event/EventSearch';
import { useState, useEffect } from 'react';

const Events = () => {
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50fc2cf7?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2069&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Carousel */}
      <div 
        className="fixed inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60"></div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
            <div className="p-3 bg-indigo-100 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">All Events</h1>
          </div>
          
          <div className="mt-4">
            <EventSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;