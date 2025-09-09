package com.bluepal.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "events")
public class Event {
    @Id
    private String id;

    private String name;
    private String description;
    private String venue;
    private LocalDateTime eventDateTime;

    private LocalDateTime bookingStartDate;
    private LocalDateTime bookingEndDate;

    private int totalSeats;
    private int availableSeats;
    private double ticketPrice;

    private List<Seat> seats;   // ✅ Linked with Seat + SeatStatus enum

    private boolean isActive;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
