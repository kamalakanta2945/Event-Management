import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Box, Paper, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { changePassword } from '../../services/authService';
import { changePasswordSchema } from '../../utils/validation'; // Include old, new, confirm
import { useState, useEffect } from 'react';
import { VscKey, VscLock, VscMail } from 'react-icons/vsc';

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(changePasswordSchema) 
  });
  
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

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) return toast.error('Passwords do not match');
    try {
      await changePassword(data);
      toast.success('Password changed');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

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
        <Paper 
          elevation={12} 
          className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
                <VscKey className="h-10 w-10 text-white" />
              </div>
            </div>
            <Typography 
              variant="h4" 
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              Change Password
            </Typography>
            <Typography 
              variant="body1" 
              className="text-gray-600"
            >
              Update your account password
            </Typography>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Box sx={{ position: 'relative' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscMail className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="Email" 
                {...register('email')} 
                error={!!errors.email} 
                helperText={errors.email?.message} 
                fullWidth 
                className="pl-10"
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscLock className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="Old Password" 
                type="password" 
                {...register('oldPassword')} 
                error={!!errors.oldPassword} 
                helperText={errors.oldPassword?.message} 
                fullWidth 
                className="pl-10"
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscLock className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="New Password" 
                type="password" 
                {...register('newPassword')} 
                error={!!errors.newPassword} 
                helperText={errors.newPassword?.message} 
                fullWidth 
                className="pl-10"
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscLock className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="Confirm Password" 
                type="password" 
                {...register('confirmPassword')} 
                error={!!errors.confirmPassword} 
                helperText={errors.confirmPassword?.message} 
                fullWidth 
                className="pl-10"
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>
            
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Change Password
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default ChangePassword;