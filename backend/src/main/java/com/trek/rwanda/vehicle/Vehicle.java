package com.trek.rwanda.vehicle;

import com.trek.rwanda.company.VehicleCompany;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private VehicleCompany company;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 250)
    private String slug;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(length = 100)
    private String brand;

    @Column(length = 100)
    private String model;

    private Integer year;

    @Column(nullable = false)
    private Integer seats;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String transmission = "AUTOMATIC";

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String fuelType = "DIESEL";

    @Column(columnDefinition = "TEXT")
    private String features;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerDay;

    @Builder.Default
    private String currency = "USD";

    @Column(length = 500)
    private String coverImageUrl;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isAvailable = true;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isPublished = false;

    @Builder.Default
    private Integer sortOrder = 0;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<VehicleImage> images = new HashSet<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
