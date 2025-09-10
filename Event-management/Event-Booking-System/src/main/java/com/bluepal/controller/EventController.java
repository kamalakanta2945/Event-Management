package com.bluepal.controller;

import com.bluepal.model.Event;
import com.bluepal.service.EventService;
import com.bluepal.util.ResponseWrapper;
import com.bluepal.model.UserModel;
import com.bluepal.model.USER_ROLE;
import com.bluepal.service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
@CrossOrigin(origins = "*")
public class EventController {
    
    @Autowired
    private EventService eventService;

    @Autowired
    private IAuthService authService;
    
    @PostMapping
    public ResponseEntity<ResponseWrapper<Event>> createEvent(@RequestBody Event event, @RequestHeader("Authorization") String jwt) {
        UserModel user = authService.findUserProfileByJwt(jwt);
        if (user.getRole() != USER_ROLE.ROLE_ADMIN && user.getRole() != USER_ROLE.ROLE_ORGANIZER) {
            throw new AccessDeniedException("You are not authorized to create an event.");
        }
        Event createdEvent = eventService.createEvent(event, user.getId());
        return ResponseEntity.ok(new ResponseWrapper<>("Event created successfully", createdEvent));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Event>> getEventById(@PathVariable String id) {
        Event event = eventService.getEventById(id);
        return ResponseEntity.ok(new ResponseWrapper<>("Event retrieved successfully", event));
    }
    
    @GetMapping
    public ResponseEntity<ResponseWrapper<List<Event>>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(new ResponseWrapper<>("Events retrieved successfully", events));
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<ResponseWrapper<List<Event>>> getUpcomingEvents() {
        List<Event> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(new ResponseWrapper<>("Upcoming events retrieved successfully", events));
    }
    
    @GetMapping("/search")
    public ResponseEntity<ResponseWrapper<List<Event>>> searchEvents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String venue,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) LocalDateTime startDate,
            @RequestParam(required = false) LocalDateTime endDate) {
        List<Event> events = eventService.searchEvents(name, venue, category, startDate, endDate);
        return ResponseEntity.ok(new ResponseWrapper<>("Events retrieved successfully", events));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Event>> updateEvent(@PathVariable String id, @RequestBody Event event, @RequestHeader("Authorization") String jwt) {
        UserModel user = authService.findUserProfileByJwt(jwt);
        Event updatedEvent = eventService.updateEvent(id, event, user.getId());
        return ResponseEntity.ok(new ResponseWrapper<>("Event updated successfully", updatedEvent));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Void>> deleteEvent(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        UserModel user = authService.findUserProfileByJwt(jwt);
        eventService.deleteEvent(id, user.getId());
        return ResponseEntity.ok(new ResponseWrapper<>("Event deleted successfully", null));
    }
}