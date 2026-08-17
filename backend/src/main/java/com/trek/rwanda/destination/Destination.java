package com.trek.rwanda.destination;

import com.trek.rwanda.activity.Activity;
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
@Table(name = "destinations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 250)
    private String slug;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String shortDesc;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(length = 100)
    private String district;

    @Column(length = 100)
    private String province;

    @Column(length = 500)
    private String coverImageUrl;

    @Column(length = 200)
    private String openingHours;

    @Column(columnDefinition = "TEXT")
    private String thingsToKnow;

    @Column(precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(precision = 11, scale = 8)
    private BigDecimal longitude;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isPublished = false;

    @Builder.Default
    private Integer sortOrder = 0;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "destination_activities",
        joinColumns = @JoinColumn(name = "destination_id"),
        inverseJoinColumns = @JoinColumn(name = "activity_id")
    )
    @Builder.Default
    private Set<Activity> activities = new HashSet<>();

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<DestinationImage> images = new HashSet<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
