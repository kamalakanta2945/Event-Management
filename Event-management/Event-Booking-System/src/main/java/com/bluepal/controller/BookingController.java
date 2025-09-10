package com.bluepal.controller;

import com.bluepal.model.Booking;
import com.bluepal.service.BookingService;
import com.bluepal.util.ResponseWrapper;
import com.bluepal.dto.SeatSelectionRequest;
import com.bluepal.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private PdfService pdfService;
    
    @PostMapping
    public ResponseEntity<ResponseWrapper<Booking>> createBooking(@RequestBody Booking booking) {
        Booking createdBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(new ResponseWrapper<>("Booking created successfully", createdBooking));
    }

    @GetMapping
    public ResponseEntity<ResponseWrapper<List<Booking>>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(new ResponseWrapper<>("Bookings retrieved successfully", bookings));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Booking>> getBookingById(@PathVariable String id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(new ResponseWrapper<>("Booking retrieved successfully", booking));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<ResponseWrapper<List<Booking>>> getBookingsByUserId(@PathVariable String userId) {
        List<Booking> bookings = bookingService.getBookingsByUserId(userId);
        return ResponseEntity.ok(new ResponseWrapper<>("Bookings retrieved successfully", bookings));
    }
    
    @GetMapping("/event/{eventId}")
    public ResponseEntity<ResponseWrapper<List<Booking>>> getBookingsByEventId(@PathVariable String eventId) {
        List<Booking> bookings = bookingService.getBookingsByEventId(eventId);
        return ResponseEntity.ok(new ResponseWrapper<>("Bookings retrieved successfully", bookings));
    }
    
    @PostMapping("/select-seats")
    public ResponseEntity<ResponseWrapper<List<String>>> selectSeats(@RequestBody SeatSelectionRequest request) {
        List<String> selectedSeats = bookingService.selectSeats(request);
        return ResponseEntity.ok(new ResponseWrapper<>("Seats selected successfully", selectedSeats));
    }
    
    @PostMapping("/{bookingId}/confirm")
    public ResponseEntity<ResponseWrapper<Booking>> confirmBooking(
            @PathVariable String bookingId,
            @RequestParam String paymentId) {
        Booking booking = bookingService.confirmBooking(bookingId, paymentId);
        return ResponseEntity.ok(new ResponseWrapper<>("Booking confirmed successfully", booking));
    }
    
    @PostMapping("/{bookingId}/cancel")
    public ResponseEntity<ResponseWrapper<Booking>> cancelBooking(@PathVariable String bookingId) {
        Booking booking = bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok(new ResponseWrapper<>("Booking cancelled successfully", booking));
    }

    @GetMapping("/{bookingId}/ticket")
    public ResponseEntity<byte[]> downloadTicket(@PathVariable String bookingId) {
        Booking booking = bookingService.getBookingById(bookingId);
        ByteArrayInputStream pdfStream = pdfService.generateBookingPdf(booking);
        byte[] pdfBytes = pdfStream.readAllBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "ticket-" + bookingId + ".pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}