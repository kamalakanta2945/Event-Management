package com.bluepal.service;

import com.bluepal.model.Event;
import com.bluepal.repository.EventRepository;
import com.bluepal.service.EventService;
import com.bluepal.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Override
    public Event createEvent(Event event) {
        event.setCreatedAt(LocalDateTime.now());
        event.setUpdatedAt(LocalDateTime.now());
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(String id, Event event) {
        Optional<Event> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            Event updatedEvent = existingEvent.get();
            updatedEvent.setName(event.getName());
            updatedEvent.setDescription(event.getDescription());
            updatedEvent.setVenue(event.getVenue());
            updatedEvent.setEventDateTime(event.getEventDateTime());
            updatedEvent.setBookingStartDate(event.getBookingStartDate());
            updatedEvent.setBookingEndDate(event.getBookingEndDate());
            updatedEvent.setTotalSeats(event.getTotalSeats());
            updatedEvent.setTicketPrice(event.getTicketPrice());
            updatedEvent.setActive(event.isActive());
            updatedEvent.setUpdatedAt(LocalDateTime.now());
            return eventRepository.save(updatedEvent);
        }
        throw new ResourceNotFoundException("Event not found with id: " + id);
    }

    @Override
    public void deleteEvent(String id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }

    @Override
    public Event getEventById(String id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public List<Event> searchEvents(String name, String venue) {
        if (name != null && venue != null) {
            return eventRepository.findByNameContainingIgnoreCaseAndVenueContainingIgnoreCase(name, venue);
        } else if (name != null) {
            return eventRepository.findByNameContainingIgnoreCase(name);
        } else if (venue != null) {
            return eventRepository.findByVenueContainingIgnoreCase(venue);
        }
        return eventRepository.findAll();
    }

    @Override
    public Event updateSeatAvailability(String eventId, List<String> seatNumbers, boolean isAvailable) {
        Event event = getEventById(eventId);
        
        event.getSeats().stream()
            .filter(seat -> seatNumbers.contains(seat.getSeatNumber()))
            .forEach(seat -> seat.setStatus(isAvailable ? 
                com.bluepal.util.SeatStatus.AVAILABLE : 
                com.bluepal.util.SeatStatus.BOOKED));
        
        event.setAvailableSeats(isAvailable ? 
            event.getAvailableSeats() + seatNumbers.size() : 
            event.getAvailableSeats() - seatNumbers.size());
        
        event.setUpdatedAt(LocalDateTime.now());
        return eventRepository.save(event);
    }

    @Override
    public List<Event> getUpcomingEvents() {
        return eventRepository.findUpcomingEvents(LocalDateTime.now());
    }
}