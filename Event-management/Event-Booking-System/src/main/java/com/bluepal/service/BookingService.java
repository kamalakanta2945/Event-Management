package com.bluepal.service;

import com.bluepal.model.Booking;
import com.bluepal.dto.SeatSelectionRequest;
import java.util.List;

public interface BookingService {
    Booking createBooking(Booking booking);
    Booking getBookingById(String id);
    List<Booking> getBookingsByUserId(String userId);
    List<Booking> getBookingsByEventId(String eventId);
    List<Booking> getAllBookings();
    Booking confirmBooking(String bookingId, String paymentId);
    Booking cancelBooking(String bookingId);
    List<String> selectSeats(SeatSelectionRequest request);
    void sendBookingConfirmation(String bookingId);
}