package com.trek.rwanda.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    Page<Review> findByDestinationIdAndIsApprovedTrueOrderByCreatedAtDesc(UUID destinationId, Pageable pageable);
    Page<Review> findBySafariIdAndIsApprovedTrueOrderByCreatedAtDesc(UUID safariId, Pageable pageable);
    Page<Review> findByIsApprovedFalseOrderByCreatedAtDesc(Pageable pageable);

    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM Review r WHERE r.destination.id = :destId AND r.isApproved = true")
    double avgRatingByDestinationId(UUID destId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.destination.id = :destId AND r.isApproved = true")
    long countByDestinationId(UUID destId);
}
