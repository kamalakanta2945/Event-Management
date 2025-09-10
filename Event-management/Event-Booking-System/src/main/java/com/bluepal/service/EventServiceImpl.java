package com.bluepal.service;

import com.bluepal.model.Event;
import com.bluepal.model.UserModel;
import com.bluepal.model.USER_ROLE;
import com.bluepal.repository.EventRepository;
import com.bluepal.service.EventService;
import com.bluepal.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Event createEvent(Event event, String organizerId) {
        event.setOrganizerId(organizerId);
        event.setCreatedAt(LocalDateTime.now());
        event.setUpdatedAt(LocalDateTime.now());
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(String id, Event event, String userId) {
        UserModel user = userService.findUserById(userId);
        Event existingEvent = getEventById(id);

        if (!existingEvent.getOrganizerId().equals(userId) && !user.getRole().equals(USER_ROLE.ROLE_ADMIN)) {
            throw new ResourceNotFoundException("You are not authorized to update this event.");
        }

        existingEvent.setName(event.getName());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setVenue(event.getVenue());
        existingEvent.setEventDateTime(event.getEventDateTime());
        existingEvent.setBookingStartDate(event.getBookingStartDate());
        existingEvent.setBookingEndDate(event.getBookingEndDate());
        existingEvent.setTotalSeats(event.getTotalSeats());
        existingEvent.setTicketPrice(event.getTicketPrice());
        existingEvent.setActive(event.isActive());
        existingEvent.setUpdatedAt(LocalDateTime.now());
        return eventRepository.save(existingEvent);
    }

    @Override
    public void deleteEvent(String id, String userId) {
        UserModel user = userService.findUserById(userId);
        Event existingEvent = getEventById(id);

        if (!existingEvent.getOrganizerId().equals(userId) && !user.getRole().equals(USER_ROLE.ROLE_ADMIN)) {
            throw new ResourceNotFoundException("You are not authorized to delete this event.");
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
    public List<Event> searchEvents(String name, String venue, String category, LocalDateTime startDate, LocalDateTime endDate) {
        Query query = new Query();
        if (name != null && !name.isEmpty()) {
            query.addCriteria(Criteria.where("name").regex(name, "i"));
        }
        if (venue != null && !venue.isEmpty()) {
            query.addCriteria(Criteria.where("venue").regex(venue, "i"));
        }
        if (category != null && !category.isEmpty()) {
            query.addCriteria(Criteria.where("category").is(category));
        }
        if (startDate != null && endDate != null) {
            query.addCriteria(Criteria.where("eventDateTime").gte(startDate).lte(endDate));
        } else if (startDate != null) {
            query.addCriteria(Criteria.where("eventDateTime").gte(startDate));
        } else if (endDate != null) {
            query.addCriteria(Criteria.where("eventDateTime").lte(endDate));
        }
        return mongoTemplate.find(query, Event.class);
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