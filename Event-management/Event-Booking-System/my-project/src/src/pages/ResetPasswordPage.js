import ResetPassword from '../components/auth/ResetPassword';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2070&q=80'
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
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
            <p className="text-gray-600">Create a new password for your account</p>
          </div>
          
          <div className="mt-4">
            <ResetPassword />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-800 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;