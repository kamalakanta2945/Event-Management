import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Link as MuiLink, Typography, Box, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { loginSchema } from '../../utils/validation';
import { VscMail, VscLock } from 'react-icons/vsc';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err)      // Handled in service
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Paper 
        elevation={12} 
        className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
              <VscMail className="h-10 w-10 text-white" />
            </div>
          </div>
          <Typography 
            variant="h4" 
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-600"
          >
            Sign in to your account
          </Typography>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Box sx={{ position: 'relative' }}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <VscMail className="h-5 w-5 text-gray-400" />
            </div>
            <TextField 
              label="Email"
              variant="outlined"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
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
              variant="outlined"
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
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
            Login
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <MuiLink 
            component={Link} 
            to="/forgot-password" 
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Forgot Password?
          </MuiLink>
        </div>
      </Paper>
    </div>
  );
};

export default LoginForm;