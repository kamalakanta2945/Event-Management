import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../../services/authService';
import { signupSchema } from '../../utils/validation';
import { VscPerson, VscMail, VscLock } from 'react-icons/vsc';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(signupSchema) 
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      navigate('/login');
    } catch (err) {
      // Handled in service
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <Paper 
        elevation={12} 
        className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-lg">
              <VscPerson className="h-10 w-10 text-white" />
            </div>
          </div>
          <Typography 
            variant="h4" 
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Create Account
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-600"
          >
            Join us today and book amazing events
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
              <VscLock className="h-5 w-5 text-gray-400" />
            </div>
            <TextField 
              label="Password" 
              type="password" 
              {...register('password')} 
              error={!!errors.password} 
              helperText={errors.password?.message} 
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
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Signup
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default SignupForm;