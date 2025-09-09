import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { createBooking } from '../../services/bookingService';
import { bookingSchema } from '../../utils/validation';
import { FaTicketAlt } from 'react-icons/fa';
import { VscCalendar } from 'react-icons/vsc';

const BookingForm = ({ eventId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: yupResolver(bookingSchema) 
  });

  const onSubmit = async (data) => {
    data.eventId = eventId;
    try {
      await createBooking(data);
      toast.success('Booking created');
    } catch (err) {
      toast.error('Failed');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl">
      <Paper 
        elevation={8} 
        className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="flex items-center mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-4">
            <FaTicketAlt className="h-6 w-6 text-white" />
          </div>
          <Typography 
            variant="h5" 
            className="text-xl font-bold text-gray-800"
          >
            Booking Information
          </Typography>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Box sx={{ position: 'relative' }}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <VscCalendar className="h-5 w-5 text-gray-400" />
            </div>
            <TextField 
              label="Number of Tickets" 
              type="number" 
              {...register('numberOfTickets')} 
              error={!!errors.numberOfTickets} 
              helperText={errors.numberOfTickets?.message} 
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
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Create Booking
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default BookingForm;
