import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const signupSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  ).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});

export const emailSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const passwordSchema = yup.object().shape({
  newPassword: yup.string().min(8).required(),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match').required(),
});

export const changePasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
  oldPassword: yup.string().required(),
  newPassword: yup.string().min(8).required(),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')]).required(),
});

export const userSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

export const eventSchema = yup.object().shape({
  name: yup.string().required('Event name is required'),
  description: yup.string().required('Description is required'),
  date: yup.date().required('Date is required'),
  location: yup.string().required('Location is required'),
  capacity: yup.number().min(1, 'Capacity must be at least 1').required('Capacity is required'),
});

export const bookingSchema = yup.object().shape({
  numberOfTickets: yup.number().min(1, 'At least one ticket is required').required('Number of tickets is required'),
});