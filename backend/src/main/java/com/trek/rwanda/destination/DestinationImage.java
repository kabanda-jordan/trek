package com.trek.rwanda.destination;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "destination_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DestinationImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private java.util.UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(length = 255)
    private String altText;

    @Builder.Default
    private Integer sortOrder = 0;

    @Builder.Default
    private Boolean isCover = false;
}
