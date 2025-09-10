package com.bluepal.repository;

import com.bluepal.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByUserId(String userId);
    List<Booking> findByEventId(String eventId);
    Optional<Booking> findByUserIdAndEventId(String userId, String eventId);
    List<Booking> findByStatus(String status);
    Optional<Booking> findByPaymentId(String paymentId);
}