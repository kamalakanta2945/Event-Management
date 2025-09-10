package com.bluepal.service;

import com.bluepal.model.Review;

public interface ReviewService {
    Review addReview(String eventId, String userId, int rating, String comment);
}
