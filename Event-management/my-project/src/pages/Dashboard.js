import Profile from '../components/user/Profile';
import BookingsList from '../components/user/BookingsList';
import { getUserRole } from '../utils/authUtils';
import { ROLES } from '../utils/constants';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUser, FaTicketAlt, FaCrown, FaUsers, FaCalendarAlt, FaChartLine, FaMoneyBill } from 'react-icons/fa';
import Header from '../components/common/Header'; // Import the Header component

const Dashboard = () => {
  const role = getUserRole();
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=2070&q=80'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Background Carousel */}
      <div 
        className="fixed inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
      ></div>
      
      {/* Dark Overlay with Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900/95"></div>
      
      {/* Gold Accent Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 shadow-lg shadow-amber-500/30"></div>
      
      {/* Header */}
      <Header />
      
      {/* Content Container */}
      <div className="relative z-10 pt-20"> {/* Added padding-top to account for fixed header */}
        <div className="container mx-auto px-4 py-8">
          {/* Dashboard Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200 mb-4 tracking-wider">
              EVENT HORIZON
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium Event Management Dashboard
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-yellow-300 mx-auto rounded-full mt-6"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Section */}
            <div className="flex-1 group">
              <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:shadow-amber-500/10">
                <div className="flex items-center p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
                  <div className="p-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl mr-4 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
                    <FaUser className="h-6 w-6 text-amber-200" />
                  </div>
                  <h2 className="text-2xl font-bold text-amber-100">Profile</h2>
                </div>
                <div className="p-6">
                  <Profile />
                </div>
              </div>
            </div>
            
            {/* Bookings Section */}
            <div className="flex-1 group">
              <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:shadow-amber-500/10">
                <div className="flex items-center p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
                  <div className="p-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl mr-4 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
                    <FaTicketAlt className="h-6 w-6 text-amber-200" />
                  </div>
                  <h2 className="text-2xl font-bold text-amber-100">Bookings</h2>
                </div>
                <div className="p-6">
                  <BookingsList />
                </div>
              </div>
            </div>
            
            {/* Admin Panel */}
            {role === ROLES.ADMIN && (
              <div className="flex-1 group">
                <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:shadow-amber-500/10">
                  <div className="flex items-center p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
                    <div className="p-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl mr-4 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
                      <FaCrown className="h-6 w-6 text-amber-200" />
                    </div>
                    <h2 className="text-2xl font-bold text-amber-100">Admin Panel</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <Link 
                      to="/admin/users" 
                      className="flex items-center p-4 bg-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-amber-900/30 hover:to-amber-800/20 transition-all duration-300 group border border-gray-700/50 hover:border-amber-500/30"
                    >
                      <div className="p-3 bg-gradient-to-r from-amber-700/50 to-amber-800/50 rounded-lg mr-4 group-hover:from-amber-600/50 group-hover:to-amber-700/50 transition-all duration-300">
                        <FaUsers className="h-5 w-5 text-amber-200" />
                      </div>
                      <div>
                        <h3 className="font-medium text-amber-100 group-hover:text-amber-50 transition-colors">Manage Users</h3>
                        <p className="text-sm text-gray-400 mt-1">User accounts and permissions</p>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/admin/events" 
                      className="flex items-center p-4 bg-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-amber-900/30 hover:to-amber-800/20 transition-all duration-300 group border border-gray-700/50 hover:border-amber-500/30"
                    >
                      <div className="p-3 bg-gradient-to-r from-amber-700/50 to-amber-800/50 rounded-lg mr-4 group-hover:from-amber-600/50 group-hover:to-amber-700/50 transition-all duration-300">
                        <FaCalendarAlt className="h-5 w-5 text-amber-200" />
                      </div>
                      <div>
                        <h3 className="font-medium text-amber-100 group-hover:text-amber-50 transition-colors">Manage Events</h3>
                        <p className="text-sm text-gray-400 mt-1">Event creation and management</p>
                      </div>
                    </Link>

                    <Link 
                      to="/admin/payments" 
                      className="flex items-center p-4 bg-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-amber-900/30 hover:to-amber-800/20 transition-all duration-300 group border border-gray-700/50 hover:border-amber-500/30"
                    >
                      <div className="p-3 bg-gradient-to-r from-amber-700/50 to-amber-800/50 rounded-lg mr-4 group-hover:from-amber-600/50 group-hover:to-amber-700/50 transition-all duration-300">
                        <FaMoneyBill className="h-5 w-5 text-amber-200" />
                      </div>
                      <div>
                        <h3 className="font-medium text-amber-100 group-hover:text-amber-50 transition-colors">Payments</h3>
                        <p className="text-sm text-gray-400 mt-1">Payment history and verification</p>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/admin/analytics" 
                      className="flex items-center p-4 bg-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-amber-900/30 hover:to-amber-800/20 transition-all duration-300 group border border-gray-700/50 hover:border-amber-500/30"
                    >
                      <div className="p-3 bg-gradient-to-r from-amber-700/50 to-amber-800/50 rounded-lg mr-4 group-hover:from-amber-600/50 group-hover:to-amber-700/50 transition-all duration-300">
                        <FaChartLine className="h-5 w-5 text-amber-200" />
                      </div>
                      <div>
                        <h3 className="font-medium text-amber-100 group-hover:text-amber-50 transition-colors">Analytics</h3>
                        <p className="text-sm text-gray-400 mt-1">Performance metrics and insights</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Gold Footer Accent */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 shadow-lg shadow-amber-500/30"></div>
    </div>
  );
};

export default Dashboard;