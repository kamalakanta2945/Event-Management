import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent, getEventById, updateEvent } from '../../services/eventService';
import { toast } from 'react-toastify';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

const eventSchema = yup.object().shape({
    name: yup.string().required('Event name is required'),
    description: yup.string().required('Description is required'),
    venue: yup.string().required('Venue is required'),
    eventDateTime: yup.date().required('Event date and time are required'),
    bookingStartDate: yup.date().required('Booking start date is required'),
    bookingEndDate: yup.date().required('Booking end date is required'),
    totalSeats: yup.number().min(1, 'Must be at least 1').required('Total seats are required'),
    ticketPrice: yup.number().min(0, 'Cannot be negative').required('Ticket price is required'),
    isActive: yup.boolean(),
});

const EventForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(eventSchema),
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchEvent = async () => {
                try {
                    const { data } = await getEventById(id);
                    setValue('name', data.name);
                    setValue('description', data.description);
                    setValue('venue', data.venue);
                    setValue('eventDateTime', new Date(data.eventDateTime).toISOString().slice(0, 16));
                    setValue('bookingStartDate', new Date(data.bookingStartDate).toISOString().slice(0, 16));
                    setValue('bookingEndDate', new Date(data.bookingEndDate).toISOString().slice(0, 16));
                    setValue('totalSeats', data.totalSeats);
                    setValue('ticketPrice', data.ticketPrice);
                    setValue('isActive', data.isActive);
                } catch (error) {
                    toast.error('Failed to fetch event details.');
                }
            };
            fetchEvent();
        }
    }, [id, isEditMode, setValue]);

    const onSubmit = async (data) => {
        try {
            if (isEditMode) {
                await updateEvent(id, data);
                toast.success('Event updated successfully!');
            } else {
                await createEvent(data);
                toast.success('Event created successfully!');
            }
            navigate('/my-events');
        } catch (error) {
            toast.error(`Failed to ${isEditMode ? 'update' : 'create'} event.`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Event' : 'Create Event'}</h1>
            <TextField label="Event Name" fullWidth {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
            <TextField label="Description" fullWidth multiline rows={4} {...register('description')} error={!!errors.description} helperText={errors.description?.message} />
            <TextField label="Venue" fullWidth {...register('venue')} error={!!errors.venue} helperText={errors.venue?.message} />
            <TextField label="Event Date and Time" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} {...register('eventDateTime')} error={!!errors.eventDateTime} helperText={errors.eventDateTime?.message} />
            <TextField label="Booking Start Date" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} {...register('bookingStartDate')} error={!!errors.bookingStartDate} helperText={errors.bookingStartDate?.message} />
            <TextField label="Booking End Date" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} {...register('bookingEndDate')} error={!!errors.bookingEndDate} helperText={errors.bookingEndDate?.message} />
            <TextField label="Total Seats" type="number" fullWidth {...register('totalSeats')} error={!!errors.totalSeats} helperText={errors.totalSeats?.message} />
            <TextField label="Ticket Price" type="number" fullWidth {...register('ticketPrice')} error={!!errors.ticketPrice} helperText={errors.ticketPrice?.message} />
            <FormControlLabel control={<Checkbox {...register('isActive')} />} label="Is Active" />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                {isEditMode ? 'Update Event' : 'Create Event'}
            </Button>
        </form>
    );
};

export default EventForm;
