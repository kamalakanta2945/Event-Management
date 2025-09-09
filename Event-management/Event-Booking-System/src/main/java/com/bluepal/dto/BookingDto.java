package com.bluepal.dto;

import lombok.Data;
import java.util.List;

@Data
public class BookingDto {
    private String eventId;
    private String userId;
    private List<String> seatNumbers;
    private int numberOfTickets;
    private double totalAmount;
}