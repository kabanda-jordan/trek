package com.trek.rwanda.admin;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.PageResponse;
import com.trek.rwanda.common.SlugUtil;
import com.trek.rwanda.vehicle.Vehicle;
import com.trek.rwanda.vehicle.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/vehicles")
@RequiredArgsConstructor
public class AdminVehicleController {

    private final VehicleRepository vehicleRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Vehicle>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Vehicle> vehicles = vehicleRepository.findAll(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(vehicles)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Vehicle>> get(@PathVariable String id) {
        Vehicle v = vehicleRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));
        return ResponseEntity.ok(ApiResponse.ok(v));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Vehicle>> create(@RequestBody Map<String, Object> body) {
        Vehicle v = new Vehicle();
        applyFields(v, body);
        vehicleRepository.save(v);
        return ResponseEntity.ok(ApiResponse.ok(v, "Vehicle created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Vehicle>> update(@PathVariable String id, @RequestBody Map<String, Object> body) {
        Vehicle v = vehicleRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));
        applyFields(v, body);
        vehicleRepository.save(v);
        return ResponseEntity.ok(ApiResponse.ok(v, "Vehicle updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        vehicleRepository.deleteById(java.util.UUID.fromString(id));
        return ResponseEntity.ok(ApiResponse.ok(null, "Vehicle deleted"));
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<ApiResponse<Vehicle>> toggleAvailability(@PathVariable String id) {
        Vehicle v = vehicleRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));
        v.setIsAvailable(!v.getIsAvailable());
        vehicleRepository.save(v);
        return ResponseEntity.ok(ApiResponse.ok(v));
    }

    private void applyFields(Vehicle v, Map<String, Object> body) {
        if (body.containsKey("name")) {
            v.setName((String) body.get("name"));
            if (v.getSlug() == null || v.getSlug().isEmpty()) {
                v.setSlug(SlugUtil.toSlug((String) body.get("name")));
            }
        }
        if (body.containsKey("type")) v.setType((String) body.get("type"));
        if (body.containsKey("brand")) v.setBrand((String) body.get("brand"));
        if (body.containsKey("model")) v.setModel((String) body.get("model"));
        if (body.containsKey("year")) v.setYear((Integer) body.get("year"));
        if (body.containsKey("seats")) v.setSeats((Integer) body.get("seats"));
        if (body.containsKey("transmission")) v.setTransmission((String) body.get("transmission"));
        if (body.containsKey("fuelType")) v.setFuelType((String) body.get("fuelType"));
        if (body.containsKey("features")) v.setFeatures((String) body.get("features"));
        if (body.containsKey("pricePerDay")) v.setPricePerDay(new java.math.BigDecimal(body.get("pricePerDay").toString()));
        if (body.containsKey("coverImageUrl")) v.setCoverImageUrl((String) body.get("coverImageUrl"));
        if (body.containsKey("isAvailable")) v.setIsAvailable((Boolean) body.get("isAvailable"));
        if (body.containsKey("isPublished")) v.setIsPublished((Boolean) body.get("isPublished"));
    }

    private PageResponse<Vehicle> toPageResponse(Page<Vehicle> page) {
        return new PageResponse<>(page.getContent(), page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize());
    }
}
