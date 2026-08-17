package com.trek.rwanda.safari;

import com.trek.rwanda.activity.Activity;
import com.trek.rwanda.destination.Destination;
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
@Table(name = "safaris")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Safari {

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

    @Column(nullable = false)
    private Integer durationDays;

    @Builder.Default
    private Integer durationNights = 0;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Builder.Default
    private String currency = "USD";

    @Builder.Default
    private Integer maxParticipants = 20;

    @Column(length = 20)
    @Builder.Default
    private String difficultyLevel = "MODERATE";

    @Column(length = 500)
    private String coverImageUrl;

    @Column(columnDefinition = "TEXT")
    private String includedItems;

    @Column(columnDefinition = "TEXT")
    private String excludedItems;

    @Column(columnDefinition = "TEXT")
    private String itinerary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id")
    private Destination destination;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "safari_activities",
        joinColumns = @JoinColumn(name = "safari_id"),
        inverseJoinColumns = @JoinColumn(name = "activity_id")
    )
    @Builder.Default
    private Set<Activity> activities = new HashSet<>();

    @OneToMany(mappedBy = "safari", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<SafariImage> images = new HashSet<>();

    @Column(nullable = false)
    @Builder.Default
    private Boolean isPublished = false;

    @Builder.Default
    private Integer sortOrder = 0;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
