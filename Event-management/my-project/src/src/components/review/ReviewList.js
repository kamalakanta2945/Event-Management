import React from 'react';
import { Box, Typography, Rating, List, ListItem, ListItemText, Divider } from '@mui/material';

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <Typography>No reviews yet.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Reviews</Typography>
            <List>
                {reviews.map((review, index) => (
                    <React.Fragment key={review.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Rating value={review.rating} readOnly />
                                        <Typography sx={{ ml: 1 }}>by User {review.userId.substring(0, 8)}</Typography>
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="body2" color="text.primary">
                                        {review.comment}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        {index < reviews.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default ReviewList;
