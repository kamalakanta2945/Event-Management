import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { createEvent } from '../../services/eventService';
import * as yup from 'yup';

// ==================== Yup Validation Schema ====================
export const eventSchema = yup.object().shape({
  name: yup.string().required('Event name is required'),
  description: yup.string().required('Description is required'),
  venue: yup.string().required('Venue is required'),
  eventDateTime: yup.string().required('Event date & time is required'),
  bookingStartDate: yup.string().required('Booking start date is required'),
  bookingEndDate: yup.string().required('Booking end date is required'),
  totalSeats: yup.number().typeError('Total seats must be a number').required('Total seats are required'),
  ticketPrice: yup.number().typeError('Ticket price must be a number').required('Ticket price is required'),
  isActive: yup.boolean().required('Active status is required')
});

const CreateEvent = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: { isActive: true }
  });

  const onSubmit = async (data) => {
    try {
      await createEvent(data);
      toast.success('Event created successfully!');
      reset({ isActive: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create event');
      console.error('Create event error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <TextField
        label="Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />

      <TextField
        label="Description"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
        fullWidth
      />

      <TextField
        label="Venue"
        {...register('venue')}
        error={!!errors.venue}
        helperText={errors.venue?.message}
        fullWidth
      />

      <TextField
        label="Event Date & Time"
        type="datetime-local"
        {...register('eventDateTime')}
        error={!!errors.eventDateTime}
        helperText={errors.eventDateTime?.message}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Booking Start Date"
        type="datetime-local"
        {...register('bookingStartDate')}
        error={!!errors.bookingStartDate}
        helperText={errors.bookingStartDate?.message}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Booking End Date"
        type="datetime-local"
        {...register('bookingEndDate')}
        error={!!errors.bookingEndDate}
        helperText={errors.bookingEndDate?.message}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Total Seats"
        type="number"
        {...register('totalSeats')}
        error={!!errors.totalSeats}
        helperText={errors.totalSeats?.message}
        fullWidth
      />

      <TextField
        label="Ticket Price"
        type="number"
        {...register('ticketPrice')}
        error={!!errors.ticketPrice}
        helperText={errors.ticketPrice?.message}
        fullWidth
      />

      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Active Status"
            {...field}
            error={!!errors.isActive}
            helperText={errors.isActive?.message}
            fullWidth
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </TextField>
        )}
      />

      <Button type="submit" variant="contained" fullWidth>
        Create Event
      </Button>
    </form>
  );
};

export default CreateEvent;
