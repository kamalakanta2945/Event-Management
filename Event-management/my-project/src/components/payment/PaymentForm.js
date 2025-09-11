import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Box, Paper, Typography, CircularProgress } from '@mui/material';
import { createOrder, verifyPayment } from '../../services/paymentService';
import { getBookingById, confirmBooking } from '../../services/bookingService';
import { toast } from 'react-toastify';
import { VscCreditCard, VscLock } from 'react-icons/vsc';

const PaymentForm = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const res = await getBookingById(bookingId);
        const booking = res?.data || res; // unwrap ResponseWrapper
        setAmount(booking?.totalAmount || 0);
      } catch (e) {
        toast.error('Failed to load booking');
      }
    };
    if (bookingId) loadBooking();
  }, [bookingId]);
  
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) return toast.error('Razorpay SDK failed to load');
    
    setLoading(true);
    try {
      const orderRes = await createOrder({ bookingId, amount });
      const order = orderRes?.data || orderRes;
      const options = {
        key: order.key,
        amount: order.amount,
        currency: 'INR',
        name: 'Event Booking',
        description: 'Test Transaction',
        order_id: order.orderId || order.id,
        handler: async (response) => {
          const verifyRes = await verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
          const payment = verifyRes?.data || verifyRes;
          if (payment?.status === 'SUCCESS') {
            try {
              await confirmBooking(bookingId, response.razorpay_payment_id);
            } catch (e) {}
            toast.success('Payment successful');
          } else {
            toast.error('Payment verification failed');
          }
        },
        theme: { color: '#3399cc' },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      toast.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={8} 
      className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl transform transition-all duration-300 hover:scale-[1.01]"
    >
      <Box className="flex items-center mb-4">
        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4">
          <VscCreditCard className="h-6 w-6 text-white" />
        </div>
        <div>
          <Typography 
            variant="h5" 
            className="text-xl font-bold text-gray-800"
          >
            Payment Details
          </Typography>
          <Typography 
            variant="body2" 
            className="text-gray-600"
          >
            Amount: ${amount}
          </Typography>
        </div>
      </Box>
      
      <Box className="flex items-center mb-6 p-3 bg-white bg-opacity-70 rounded-lg">
        <VscLock className="h-5 w-5 text-green-600 mr-2" />
        <Typography 
          variant="body2" 
          className="text-gray-600"
        >
          Secure payment powered by Razorpay
        </Typography>
      </Box>
      
      <Button 
        variant="contained" 
        onClick={handlePayment} 
        disabled={loading}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 w-full flex items-center justify-center"
      >
        {loading ? (
          <>
            <CircularProgress size={20} className="text-white mr-2" />
            Processing...
          </>
        ) : (
          <>
            <VscCreditCard className="mr-2" />
            Pay Now
          </>
        )}
      </Button>
    </Paper>
  );
};

export default PaymentForm;