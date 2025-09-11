import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addReview } from '../../services/reviewService';
import { TextField, Button, Rating, Box, Typography } from '@mui/material';

const reviewSchema = yup.object().shape({
    rating: yup.number().min(1, 'Rating is required').required(),
    comment: yup.string(),
});

const ReviewForm = ({ eventId, onReviewSubmit }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(reviewSchema),
        defaultValues: {
            rating: 0,
        },
    });

    const ratingValue = watch('rating');

    const onSubmit = async (data) => {
        try {
            await addReview({ ...data, eventId });
            onReviewSubmit(); // Callback to refresh reviews
        } catch (error) {
            // Error is already handled by the service
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Typography component="legend">Your Rating</Typography>
            <Rating
                name="rating"
                value={ratingValue}
                onChange={(event, newValue) => {
                    setValue('rating', newValue, { shouldValidate: true });
                }}
            />
            {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}

            <TextField
                label="Your Review"
                fullWidth
                multiline
                rows={4}
                {...register('comment')}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit Review
            </Button>
        </form>
    );
};

export default ReviewForm;
