// Similar to UpdateUser, for events
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { getEventById, updateEvent } from '../../services/eventService';
import { eventSchema } from '../../utils/validation';

const UpdateEvent = ({ eventId } ) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(eventSchema) });

  useEffect(() => {
    getEventById(eventId).then(reset);
  }, [eventId, reset]);

  const onSubmit = async (data) => {
    try {
      await updateEvent(eventId, data);
      toast.success('Event updated');
    } catch (err) {
      toast.error('Failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Fields */}
      <Button type="submit" variant="contained" fullWidth>Update Event</Button>
    </form>
  );
};

export default UpdateEvent;