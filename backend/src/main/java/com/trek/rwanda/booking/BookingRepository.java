package com.trek.rwanda.booking;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {
    Optional<Booking> findByBookingRef(String bookingRef);
    Page<Booking> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);
    Page<Booking> findByStatusOrderByCreatedAtDesc(String status, Pageable pageable);
    Page<Booking> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(String status);
}
