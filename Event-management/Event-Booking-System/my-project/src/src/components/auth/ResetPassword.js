import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';
import { passwordSchema } from '../../utils/validation'; // Yup for password and confirm

const ResetPassword = () => {
  const { token } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(passwordSchema) });

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) return toast.error('Passwords do not match');
    try {
      await resetPassword(token, data.newPassword);
      toast.success('Password reset successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField label="New Password" type="password" {...register('newPassword')} error={!!errors.newPassword} helperText={errors.newPassword?.message} fullWidth />
      <TextField label="Confirm Password" type="password" {...register('confirmPassword')} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} fullWidth />
      <Button type="submit" variant="contained" fullWidth>Reset Password</Button>
    </form>
  );
};

export default ResetPassword;