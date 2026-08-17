package com.trek.rwanda.vehicle;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleRepository vehicleRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Vehicle>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer seats) {

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Vehicle> vehicles;

        if (type != null && !type.isEmpty()) {
            vehicles = vehicleRepository.findByTypeAndIsPublishedTrue(type, pageRequest);
        } else {
            vehicles = vehicleRepository.findByIsPublishedTrueAndIsAvailableTrue(pageRequest);
        }

        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(vehicles)));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Vehicle>> getBySlug(@PathVariable String slug) {
        Vehicle vehicle = vehicleRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found: " + slug));
        return ResponseEntity.ok(ApiResponse.ok(vehicle));
    }

    private PageResponse<Vehicle> toPageResponse(Page<Vehicle> page) {
        return new PageResponse<>(
                page.getContent(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getSize()
        );
    }
}
