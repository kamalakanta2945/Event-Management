THIS SHOULD BE A LINTER ERRORpackage com.bluepal.repository;

import com.bluepal.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {

    // Search by event name (case insensitive)
    List<Event> findByNameContainingIgnoreCase(String name);

    // Search by venue (case insensitive)
    List<Event> findByVenueContainingIgnoreCase(String venue);

    // Search by both event name + venue
    List<Event> findByNameContainingIgnoreCaseAndVenueContainingIgnoreCase(String name, String venue);

    // Get upcoming events (date greater than now)
    @Query("{ 'eventDateTime': { $gt: ?0 } }")
    List<Event> findUpcomingEvents(LocalDateTime currentDateTime);

    // Find events by organizer id
    List<Event> findByOrganizerId(String organizerId);
}
