import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material';
import Loader from '../common/Loader';
import { getProfile } from '../../services/authService';
import { Link } from 'react-router-dom';
import { VscPerson, VscMail, VscKey, VscEdit, VscLock } from 'react-icons/vsc';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentBg, setCurrentBg] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2071&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getProfile()
      .then((data) => setUser(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg">
            <VscPerson className="h-10 w-10 text-white" />
          </div>
        </div>
        <Typography variant="h5" className="text-xl font-bold text-gray-800 mb-2">
          Profile Not Found
        </Typography>
        <Typography variant="body1" className="text-gray-600 mb-4">
          We couldn't find your profile information
        </Typography>
      </div>
    </div>
  );

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
        <Card 
          elevation={12} 
          className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Avatar 
                className="h-24 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
              >
                <VscPerson className="h-12 w-12 text-white" />
              </Avatar>
            </div>
            <Typography 
              variant="h4" 
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              {user.fullName}
            </Typography>
            <Typography 
              variant="body1" 
              className="text-gray-600"
            >
              {user.role}
            </Typography>
          </div>
          
          <CardContent className="space-y-4 p-0">
            <Box className="flex items-center p-3 bg-gray-50 rounded-lg">
              <VscPerson className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <Typography variant="body2" className="text-gray-500 text-sm">Full Name</Typography>
                <Typography variant="body1" className="font-medium text-gray-800">{user.fullName}</Typography>
              </div>
            </Box>
            
            <Box className="flex items-center p-3 bg-gray-50 rounded-lg">
              <VscMail className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <Typography variant="body2" className="text-gray-500 text-sm">Email Address</Typography>
                <Typography variant="body1" className="font-medium text-gray-800">{user.email1}</Typography>
              </div>
            </Box>
            
            <Box className="flex items-center p-3 bg-gray-50 rounded-lg">
              <VscKey className="h-5 w-5 text-purple-500 mr-3" />
              <div>
                <Typography variant="body2" className="text-gray-500 text-sm">Role</Typography>
                <Typography variant="body1" className="font-medium text-gray-800">{user.role}</Typography>
              </div>
            </Box>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button 
                variant="outlined" 
                component={Link} 
                to="/update-profile"
                className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 py-2 rounded-lg flex items-center justify-center"
              >
                <VscEdit className="mr-2" />
                Update Profile
              </Button>
              
              <Button 
                variant="outlined" 
                component={Link} 
                to="/change-password"
                className="flex-1 border-purple-500 text-purple-600 hover:bg-purple-50 py-2 rounded-lg flex items-center justify-center"
              >
                <VscLock className="mr-2" />
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;