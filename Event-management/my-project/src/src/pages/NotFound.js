import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=2070&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div 
        className="fixed inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-12 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex justify-center mb-8">
            <div className="p-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <Typography 
            variant="h1" 
            className="text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500"
          >
            404
          </Typography>
          
          <Typography 
            variant="h4" 
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
          >
            Page Not Found
          </Typography>
          
          <Typography 
            variant="body1" 
            className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/" 
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Go to Homepage
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="px-6 py-3 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;