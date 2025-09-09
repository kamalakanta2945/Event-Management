// Similar to UpdateProfile, but for admin
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { getUserById, updateUser } from '../../services/adminService';
import { userSchema } from '../../utils/validation';

const UpdateUser = ({ userId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(userSchema) });

  useEffect(() => {
    getUserById(userId).then(reset);
  }, [userId, reset]);

  const onSubmit = async (data) => {
    try {
      await updateUser(userId, data);
      toast.success('User updated');
    } catch (err) {
      toast.error('Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Fields */}
      <Button type="submit" variant="contained" fullWidth>Update User</Button>
    </form>
  );
};

export default UpdateUser;