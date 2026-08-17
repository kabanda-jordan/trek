package com.trek.rwanda.vehicle;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehicle_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private java.util.UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(length = 255)
    private String altText;

    @Builder.Default
    private Integer sortOrder = 0;

    @Builder.Default
    private Boolean isCover = false;
}
