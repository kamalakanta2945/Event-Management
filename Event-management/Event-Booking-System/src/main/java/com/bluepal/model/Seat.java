package com.bluepal.model;

import com.bluepal.util.SeatStatus;
import lombok.Data;

@Data
public class Seat {
	private String seatNumber;
	private SeatStatus status; // ✅ Enum instead of SearchIndexStatus
	private String category; // e.g., VIP, REGULAR
	private double price;
}
