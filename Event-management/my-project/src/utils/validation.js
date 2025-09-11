import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email1: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const signupSchema = yup.object().shape({
  firstName: yup.string().required('First name required'),
  lastName: yup.string().required('Last name required'),
  email1: yup.string().email('Invalid email').required('Email required'),
  password: yup.string().min(8, 'Min 8 chars').required('Password required'),
  // Add more
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
  // Similar to signup
});

export const eventSchema = yup.object().shape({
  name: yup.string().required(),
  // Add fields
});

export const bookingSchema = yup.object().shape({
  numberOfTickets: yup.number().min(1).required(),
  // Add
});