package com.bluepal.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "reviews")
public class Review {
    @Id
    private String id;
    private String eventId;
    private String userId;
    private int rating; // 1-5
    private String comment;
    private LocalDateTime createdAt;
}
