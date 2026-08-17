package com.trek.rwanda.safari;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "safari_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SafariImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private java.util.UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "safari_id", nullable = false)
    private Safari safari;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(length = 255)
    private String altText;

    @Builder.Default
    private Integer sortOrder = 0;

    @Builder.Default
    private Boolean isCover = false;
}
