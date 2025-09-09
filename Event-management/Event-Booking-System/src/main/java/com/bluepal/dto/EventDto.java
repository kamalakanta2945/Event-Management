package com.bluepal.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class EventDto {
    private String name;
    private String description;
    private String venue;
    private LocalDateTime eventDateTime;
    private LocalDateTime bookingStartDate;
    private LocalDateTime bookingEndDate;
    private int totalSeats;
    private double ticketPrice;
    private boolean isActive;
}