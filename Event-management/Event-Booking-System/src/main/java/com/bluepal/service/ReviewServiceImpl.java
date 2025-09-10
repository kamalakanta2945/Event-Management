package com.bluepal.service;

import com.bluepal.exception.ResourceNotFoundException;
import com.bluepal.model.Booking;
import com.bluepal.model.Event;
import com.bluepal.model.Review;
import com.bluepal.repository.BookingRepository;
import com.bluepal.repository.EventRepository;
import com.bluepal.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    @Transactional
    public Review addReview(String eventId, String userId, int rating, String comment) {
        // Check if the user has booked the event
        bookingRepository.findByUserIdAndEventId(userId, eventId)
                .orElseThrow(() -> new ResourceNotFoundException("You have not booked this event."));

        // Create and save the review
        Review review = new Review();
        review.setEventId(eventId);
        review.setUserId(userId);
        review.setRating(rating);
        review.setComment(comment);
        review.setCreatedAt(LocalDateTime.now());
        Review savedReview = reviewRepository.save(review);

        // Update the event with the new review and average rating
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (event.getReviews() == null) {
            event.setReviews(new ArrayList<>());
        }
        event.getReviews().add(savedReview);

        // Recalculate average rating
        double averageRating = event.getReviews().stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
        event.setAverageRating(averageRating);

        eventRepository.save(event);

        return savedReview;
    }
}
