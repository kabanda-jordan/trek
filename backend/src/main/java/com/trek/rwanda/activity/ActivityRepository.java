package com.trek.rwanda.activity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ActivityRepository extends JpaRepository<Activity, UUID> {
    Optional<Activity> findBySlug(String slug);
    boolean existsByName(String name);
}
