package com.trek.rwanda.safari;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface SafariRepository extends JpaRepository<Safari, UUID> {
    Optional<Safari> findBySlug(String slug);
    boolean existsBySlug(String slug);

    Page<Safari> findByIsPublishedTrue(Pageable pageable);

    Page<Safari> findByDestinationIdAndIsPublishedTrue(UUID destinationId, Pageable pageable);

    @Query("SELECT s FROM Safari s WHERE s.isPublished = true AND " +
           "(LOWER(s.name) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(s.description) LIKE LOWER(CONCAT('%', :q, '%')))")
    Page<Safari> search(String q, Pageable pageable);
}
