import api from './api';

// Create a new payment order
export const createOrder = async (data) => {
  try {
    const response = await api.post('/payments/create-order', data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Verify payment after completion
export const verifyPayment = async (orderId, paymentId, signature) => {
  try {
    const response = await api.post('/payments/verify', null, {
      params: {
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Get payment details by booking ID
export const getPaymentByBookingId = async (bookingId) => {
  try {
    const response = await api.get(`/payments/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw error;
  }
};

// Get all payments (admin)
export const getAllPayments = async () => {
  try {
    const response = await api.get('/payments');
    return response.data;
  } catch (error) {
    console.error('Error fetching all payments:', error);
    throw error;
  }
};
