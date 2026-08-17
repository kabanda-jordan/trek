package com.trek.rwanda.vehicle;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface VehicleRepository extends JpaRepository<Vehicle, UUID> {
    Optional<Vehicle> findBySlug(String slug);
    boolean existsBySlug(String slug);

    Page<Vehicle> findByIsPublishedTrueAndIsAvailableTrue(Pageable pageable);

    Page<Vehicle> findByTypeAndIsPublishedTrue(String type, Pageable pageable);

    Page<Vehicle> findByCompanyIdAndIsPublishedTrue(UUID companyId, Pageable pageable);

    @Query("SELECT v FROM Vehicle v WHERE v.isPublished = true AND v.isAvailable = true AND " +
           "(LOWER(v.name) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(v.brand) LIKE LOWER(CONCAT('%', :q, '%')))")
    Page<Vehicle> search(String q, Pageable pageable);
}
