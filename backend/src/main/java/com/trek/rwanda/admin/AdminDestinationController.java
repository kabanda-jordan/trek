package com.trek.rwanda.admin;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.PageResponse;
import com.trek.rwanda.common.SlugUtil;
import com.trek.rwanda.destination.Destination;
import com.trek.rwanda.destination.DestinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/destinations")
@RequiredArgsConstructor
public class AdminDestinationController {

    private final DestinationRepository destinationRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Destination>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Destination> destinations = destinationRepository.findAll(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(destinations)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Destination>> get(@PathVariable String id) {
        Destination d = destinationRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Destination not found"));
        return ResponseEntity.ok(ApiResponse.ok(d));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Destination>> create(@RequestBody Map<String, Object> body) {
        Destination d = new Destination();
        applyFields(d, body);
        destinationRepository.save(d);
        return ResponseEntity.ok(ApiResponse.ok(d, "Destination created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Destination>> update(@PathVariable String id, @RequestBody Map<String, Object> body) {
        Destination d = destinationRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Destination not found"));
        applyFields(d, body);
        destinationRepository.save(d);
        return ResponseEntity.ok(ApiResponse.ok(d, "Destination updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        destinationRepository.deleteById(java.util.UUID.fromString(id));
        return ResponseEntity.ok(ApiResponse.ok(null, "Destination deleted"));
    }

    @PutMapping("/{id}/publish")
    public ResponseEntity<ApiResponse<Destination>> togglePublish(@PathVariable String id) {
        Destination d = destinationRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Destination not found"));
        d.setIsPublished(!d.getIsPublished());
        destinationRepository.save(d);
        return ResponseEntity.ok(ApiResponse.ok(d, d.getIsPublished() ? "Published" : "Unpublished"));
    }

    private void applyFields(Destination d, Map<String, Object> body) {
        if (body.containsKey("name")) {
            d.setName((String) body.get("name"));
            if (d.getSlug() == null || d.getSlug().isEmpty()) {
                d.setSlug(SlugUtil.toSlug((String) body.get("name")));
            }
        }
        if (body.containsKey("description")) d.setDescription((String) body.get("description"));
        if (body.containsKey("shortDesc")) d.setShortDesc((String) body.get("shortDesc"));
        if (body.containsKey("location")) d.setLocation((String) body.get("location"));
        if (body.containsKey("district")) d.setDistrict((String) body.get("district"));
        if (body.containsKey("province")) d.setProvince((String) body.get("province"));
        if (body.containsKey("coverImageUrl")) d.setCoverImageUrl((String) body.get("coverImageUrl"));
        if (body.containsKey("openingHours")) d.setOpeningHours((String) body.get("openingHours"));
        if (body.containsKey("thingsToKnow")) d.setThingsToKnow((String) body.get("thingsToKnow"));
        if (body.containsKey("isPublished")) d.setIsPublished((Boolean) body.get("isPublished"));
    }

    private PageResponse<Destination> toPageResponse(Page<Destination> page) {
        return new PageResponse<>(page.getContent(), page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize());
    }
}
