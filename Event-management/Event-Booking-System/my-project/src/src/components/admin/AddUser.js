import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, MenuItem, InputAdornment, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { addUser } from '../../services/adminService';
import * as yup from 'yup';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// ==================== Yup Validation Schema ====================
const userSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  middleName: yup.string().nullable(),
  lastName: yup.string().required('Last name is required'),
  email1: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().oneOf(['ROLE_USER', 'ROLE_ADMIN'], 'Invalid role').required('Role is required'),
  mobileNo1: yup.string().required('Mobile number is required'),
  mobileNo2: yup.string().nullable(),
  password: yup.string().required('Password is required')
});

const AddUser = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      role: 'ROLE_USER' // default role to avoid MUI warning
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      // Convert mobile numbers to strings to avoid backend issues
      const payload = {
        firstName: data.firstName,
        middleName: data.middleName || null,
        lastName: data.lastName,
        email1: data.email1,
        role: data.role,
        mobileNo1: data.mobileNo1,
        mobileNo2: data.mobileNo2 || null,
        password: data.password
      };

      await addUser(payload);
      toast.success('User added successfully!');
      reset({ role: 'ROLE_USER' }); // reset form & default role
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add user');
      console.error('Add user error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        label="First Name"
        {...register('firstName')}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        fullWidth
      />
      <TextField
        label="Middle Name"
        {...register('middleName')}
        fullWidth
      />
      <TextField
        label="Last Name"
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        fullWidth
      />
      <TextField
        label="Email"
        {...register('email1')}
        error={!!errors.email1}
        helperText={errors.email1?.message}
        fullWidth
      />

      {/* Role select field */}
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Role"
            {...field}
            error={!!errors.role}
            helperText={errors.role?.message}
            fullWidth
          >
            <MenuItem value="ROLE_USER">User</MenuItem>
            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
          </TextField>
        )}
      />

      <TextField
        label="Mobile Number"
        {...register('mobileNo1')}
        error={!!errors.mobileNo1}
        helperText={errors.mobileNo1?.message}
        fullWidth
      />
      <TextField
        label="Secondary Mobile"
        {...register('mobileNo2')}
        fullWidth
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button type="submit" variant="contained" fullWidth>
        Add User
      </Button>
    </form>
  );
};

export default AddUser;
