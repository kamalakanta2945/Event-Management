import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../services/authService';
import { emailSchema } from '../../utils/validation'; // Yup for email

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(emailSchema) });

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email);
      toast.success('Reset link sent to email');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} fullWidth />
      <Button type="submit" variant="contained" fullWidth>Send Reset Link</Button>
    </form>
  );
};

export default ForgotPassword;