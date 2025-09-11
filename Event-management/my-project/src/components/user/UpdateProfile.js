import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/userService';
import { userSchema } from '../../utils/validation';
import { VscPerson, VscMail, VscKey, VscEdit } from 'react-icons/vsc';
import { useState, useEffect } from 'react';

const UpdateProfile = ({ userId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(userSchema) 
  });
  
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

  const onSubmit = async (data) => {
    try {
      await updateUser(userId, data);
      toast.success('Profile updated');
    } catch (err) {
      toast.error('Failed to update');
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
          className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
                <VscEdit className="h-10 w-10 text-white" />
              </div>
            </div>
            <Typography 
              variant="h4" 
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              Update Profile
            </Typography>
            <Typography 
              variant="body1" 
              className="text-gray-600"
            >
              Edit your personal information
            </Typography>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Box sx={{ position: 'relative' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscPerson className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="First Name" 
                {...register('firstName')} 
                error={!!errors.firstName} 
                helperText={errors.firstName?.message} 
                fullWidth 
                className="pl-10"
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscPerson className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="Last Name" 
                {...register('lastName')} 
                error={!!errors.lastName} 
                helperText={errors.lastName?.message} 
                fullWidth 
                className="pl-10"
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscMail className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="Email" 
                {...register('email1')} 
                error={!!errors.email1} 
                helperText={errors.email1?.message} 
                fullWidth 
                className="pl-10"
                InputProps={{
                  className: 'rounded-lg'
                }}
              />
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <VscKey className="h-5 w-5 text-gray-400" />
              </div>
              <TextField 
                label="Phone" 
                {...register('phone')} 
                error={!!errors.phone} 
                helperText={errors.phone?.message} 
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
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              <VscEdit className="mr-2" />
              Update Profile
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default UpdateProfile;