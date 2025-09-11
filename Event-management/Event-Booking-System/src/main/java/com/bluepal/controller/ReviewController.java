package com.bluepal.controller;

import com.bluepal.dto.ReviewRequest;
import com.bluepal.model.Review;
import com.bluepal.model.UserModel;
import com.bluepal.service.IAuthService;
import com.bluepal.service.ReviewService;
import com.bluepal.util.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private IAuthService authService;

    @PostMapping
    public ResponseEntity<ResponseWrapper<Review>> addReview(@RequestBody ReviewRequest reviewRequest, @RequestHeader("Authorization") String jwt) throws Exception {
        UserModel user = authService.findUserProfileByJwt(jwt);
        Review newReview = reviewService.addReview(
                reviewRequest.getEventId(),
                user.getId(),
                reviewRequest.getRating(),
                reviewRequest.getComment()
        );
        return ResponseEntity.ok(new ResponseWrapper<>("Review added successfully", newReview));
    }
}
