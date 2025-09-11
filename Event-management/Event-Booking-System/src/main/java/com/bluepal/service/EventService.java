package com.bluepal.service;

import com.bluepal.model.Event;
import java.util.List;
import java.time.LocalDateTime;

public interface EventService {
    Event createEvent(Event event, String organizerId);
    Event updateEvent(String id, Event event, String userId);
    void deleteEvent(String id, String userId);
    Event getEventById(String id);
    List<Event> getAllEvents();
    List<Event> searchEvents(String name, String venue, String category, LocalDateTime startDate, LocalDateTime endDate);
    Event updateSeatAvailability(String eventId, List<String> seatNumbers, boolean isAvailable);
    List<Event> getUpcomingEvents();
    List<Event> getEventsByOrganizer(String organizerId);
}