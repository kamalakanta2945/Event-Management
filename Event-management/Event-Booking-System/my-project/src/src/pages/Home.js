import UpcomingEvents from '../components/event/UpcomingEvents';
import { useState, useEffect } from 'react';

const Home = () => {
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
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-wide">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Event Booking</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Discover and book amazing events from around the world. Your next unforgettable experience is just a click away.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto rounded-full mt-8"></div>
        </div>
        
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
          </div>
          
          <div className="mt-4">
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;