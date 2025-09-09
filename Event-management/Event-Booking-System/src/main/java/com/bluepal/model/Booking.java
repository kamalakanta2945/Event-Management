package com.bluepal.model;

import java.util.List;

import java.time.LocalDateTime;
import java.util.List;
import com.bluepal.util.BookingStatus;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "bookings")
public class Booking {
	@Id
	private String id;
	private String eventId;
	private String userEmail; // must be filled when booking is created

	private String userId;
	private List<String> seatNumbers;
	private int numberOfTickets;
	private double totalAmount;
	private LocalDateTime bookingDate;
	private BookingStatus status;
	private String paymentId;
	private LocalDateTime createdAt;
}
