package com.bluepal.service;

import com.bluepal.model.Event;
import java.util.List;

public interface EventService {
    Event createEvent(Event event);
    Event updateEvent(String id, Event event);
    void deleteEvent(String id);
    Event getEventById(String id);
    List<Event> getAllEvents();
    List<Event> searchEvents(String name, String venue);
    Event updateSeatAvailability(String eventId, List<String> seatNumbers, boolean isAvailable);
    List<Event> getUpcomingEvents();
}