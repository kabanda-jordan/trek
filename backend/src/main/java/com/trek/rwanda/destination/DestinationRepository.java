package com.trek.rwanda.destination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface DestinationRepository extends JpaRepository<Destination, UUID> {
    Optional<Destination> findBySlug(String slug);
    boolean existsBySlug(String slug);

    Page<Destination> findByIsPublishedTrue(Pageable pageable);

    Page<Destination> findByDistrictIgnoreCase(String district, Pageable pageable);

    @Query("SELECT d FROM Destination d WHERE d.isPublished = true AND " +
           "(LOWER(d.name) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(d.description) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(d.location) LIKE LOWER(CONCAT('%', :q, '%')))")
    Page<Destination> search(String q, Pageable pageable);
}
