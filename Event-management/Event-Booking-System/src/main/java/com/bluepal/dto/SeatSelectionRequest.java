package com.bluepal.dto;

import lombok.Data;
import java.util.List;

@Data
public class SeatSelectionRequest {
    private String eventId;
    private List<String> seatNumbers;
    private String userId;
}