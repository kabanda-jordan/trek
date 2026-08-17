package com.trek.rwanda.company;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface VehicleCompanyRepository extends JpaRepository<VehicleCompany, UUID> {
    Optional<VehicleCompany> findBySlug(String slug);
    boolean existsBySlug(String slug);
    Page<VehicleCompany> findByIsActiveTrue(Pageable pageable);
}
