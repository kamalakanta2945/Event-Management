package com.bluepal.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bluepal.dto.SeatSelectionRequest;
import com.bluepal.exception.ResourceNotFoundException;
import com.bluepal.exception.SeatUnavailableException;
import com.bluepal.model.Booking;
import com.bluepal.model.Event;
import com.bluepal.repository.BookingRepository;
import com.bluepal.repository.EventRepository;
import java.io.ByteArrayInputStream;
import com.bluepal.util.BookingStatus;
import com.bluepal.util.EmailUtils;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private EmailUtils emailUtils; // ✅ Inject Email Utility

    @Override
    public Booking createBooking(Booking booking) {
        booking.setStatus(BookingStatus.PENDING);
        booking.setBookingDate(LocalDateTime.now());
        booking.setCreatedAt(LocalDateTime.now());
        return bookingRepository.save(booking);
    }

    @Override
    public Booking getBookingById(String id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    @Override
    public List<Booking> getBookingsByUserId(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> getBookingsByEventId(String eventId) {
        return bookingRepository.findByEventId(eventId);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking confirmBooking(String bookingId, String paymentId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setPaymentId(paymentId);

        Booking savedBooking = bookingRepository.save(booking);

        // ✅ Fetch Event details
        Event event = eventRepository.findById(booking.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + booking.getEventId()));

        // ✅ Prepare Email Content
        String subject = "Booking Confirmation - " + event.getName();
        String body = "<h2 style='color:green;'>Booking Confirmed!</h2>"
                + "<p>Dear User,</p>"
                + "<p>Your booking has been confirmed successfully. Here are the details:</p>"
                + "<table style='border-collapse: collapse; width: 100%;'>"
                + "<tr><td><b>Event:</b></td><td>" + event.getName() + "</td></tr>"
                + "<tr><td><b>Venue:</b></td><td>" + event.getVenue() + "</td></tr>"
                + "<tr><td><b>Date & Time:</b></td><td>" + event.getEventDateTime() + "</td></tr>"
                + "<tr><td><b>Booking Amount:</b></td><td>₹" + event.getTicketPrice() + "</td></tr>"
                + "<tr><td><b>Seats:</b></td><td>" + String.join(", ", booking.getSeatNumbers()) + "</td></tr>"
                + "<tr><td><b>Booking ID:</b></td><td>" + booking.getId() + "</td></tr>"
                + "<tr><td><b>Payment ID:</b></td><td>" + booking.getPaymentId() + "</td></tr>"
                + "</table>"
                + "<br/><p>Thank you for booking with us!</p>";

        // ✅ Send Email (make sure Booking has userEmail field set at creation time)
        sendBookingConfirmation(bookingId);

        return savedBooking;
    }

    @Override
    public void sendBookingConfirmation(String bookingId) {
        Booking booking = getBookingById(bookingId);
        Event event = eventRepository.findById(booking.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + booking.getEventId()));

        String subject = "Booking Confirmation - " + event.getName();
        String body = "<h2 style='color:green;'>Booking Confirmed!</h2>"
                + "<p>Dear User,</p>"
                + "<p>Your booking has been confirmed successfully. Here are the details:</p>"
                + "<table style='border-collapse: collapse; width: 100%;'>"
                + "<tr><td><b>Event:</b></td><td>" + event.getName() + "</td></tr>"
                + "<tr><td><b>Venue:</b></td><td>" + event.getVenue() + "</td></tr>"
                + "<tr><td><b>Date & Time:</b></td><td>" + event.getEventDateTime() + "</td></tr>"
                + "<tr><td><b>Booking Amount:</b></td><td>₹" + event.getTicketPrice() + "</td></tr>"
                + "<tr><td><b>Seats:</b></td><td>" + String.join(", ", booking.getSeatNumbers()) + "</td></tr>"
                + "<tr><td><b>Booking ID:</b></td><td>" + booking.getId() + "</td></tr>"
                + "<tr><td><b>Payment ID:</b></td><td>" + booking.getPaymentId() + "</td></tr>"
                + "</table>"
                + "<br/><p>Thank you for booking with us!</p>";

        ByteArrayInputStream pdf = pdfService.generateBookingPdf(booking);
        emailUtils.sendEmail(booking.getUserEmail(), subject, body, pdf.readAllBytes(), "booking-confirmation.pdf");
    }

    @Override
    public Booking cancelBooking(String bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(BookingStatus.CANCELLED);

        // Release the seats
        eventService.updateSeatAvailability(booking.getEventId(), booking.getSeatNumbers(), true);

        return bookingRepository.save(booking);
    }

    @Override
    public List<String> selectSeats(SeatSelectionRequest request) {
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + request.getEventId()));

        // Check if seats are available
        for (String seatNumber : request.getSeatNumbers()) {
            boolean isAvailable = event.getSeats().stream()
                    .filter(seat -> seat.getSeatNumber().equals(seatNumber))
                    .anyMatch(seat -> seat.getStatus() == com.bluepal.util.SeatStatus.AVAILABLE);

            if (!isAvailable) {
                throw new SeatUnavailableException("Seat " + seatNumber + " is not available");
            }
        }

        // Reserve the seats
        eventService.updateSeatAvailability(request.getEventId(), request.getSeatNumbers(), false);

        return request.getSeatNumbers();
    }
}
