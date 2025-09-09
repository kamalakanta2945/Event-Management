import ForgotPassword from '../components/auth/ForgotPassword';
import { useState, useEffect } from 'react';

const ForgotPasswordPage = () => {
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
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h1>
            <p className="text-gray-600">Enter your email to reset your password</p>
          </div>
          
          <div className="mt-4">
            <ForgotPassword />
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;