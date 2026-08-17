package com.trek.rwanda.admin;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.PageResponse;
import com.trek.rwanda.common.SlugUtil;
import com.trek.rwanda.safari.Safari;
import com.trek.rwanda.safari.SafariRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/safaris")
@RequiredArgsConstructor
public class AdminSafariController {

    private final SafariRepository safariRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Safari>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<Safari> safaris = safariRepository.findAll(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(safaris)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Safari>> get(@PathVariable String id) {
        Safari s = safariRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Safari not found"));
        return ResponseEntity.ok(ApiResponse.ok(s));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Safari>> create(@RequestBody Map<String, Object> body) {
        Safari s = new Safari();
        applyFields(s, body);
        safariRepository.save(s);
        return ResponseEntity.ok(ApiResponse.ok(s, "Safari created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Safari>> update(@PathVariable String id, @RequestBody Map<String, Object> body) {
        Safari s = safariRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Safari not found"));
        applyFields(s, body);
        safariRepository.save(s);
        return ResponseEntity.ok(ApiResponse.ok(s, "Safari updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        safariRepository.deleteById(java.util.UUID.fromString(id));
        return ResponseEntity.ok(ApiResponse.ok(null, "Safari deleted"));
    }

    @PutMapping("/{id}/publish")
    public ResponseEntity<ApiResponse<Safari>> togglePublish(@PathVariable String id) {
        Safari s = safariRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Safari not found"));
        s.setIsPublished(!s.getIsPublished());
        safariRepository.save(s);
        return ResponseEntity.ok(ApiResponse.ok(s, s.getIsPublished() ? "Published" : "Unpublished"));
    }

    private void applyFields(Safari s, Map<String, Object> body) {
        if (body.containsKey("name")) {
            s.setName((String) body.get("name"));
            if (s.getSlug() == null || s.getSlug().isEmpty()) {
                s.setSlug(SlugUtil.toSlug((String) body.get("name")));
            }
        }
        if (body.containsKey("description")) s.setDescription((String) body.get("description"));
        if (body.containsKey("shortDesc")) s.setShortDesc((String) body.get("shortDesc"));
        if (body.containsKey("durationDays")) s.setDurationDays((Integer) body.get("durationDays"));
        if (body.containsKey("durationNights")) s.setDurationNights((Integer) body.get("durationNights"));
        if (body.containsKey("price")) s.setPrice(new java.math.BigDecimal(body.get("price").toString()));
        if (body.containsKey("maxParticipants")) s.setMaxParticipants((Integer) body.get("maxParticipants"));
        if (body.containsKey("difficultyLevel")) s.setDifficultyLevel((String) body.get("difficultyLevel"));
        if (body.containsKey("coverImageUrl")) s.setCoverImageUrl((String) body.get("coverImageUrl"));
        if (body.containsKey("includedItems")) s.setIncludedItems((String) body.get("includedItems"));
        if (body.containsKey("excludedItems")) s.setExcludedItems((String) body.get("excludedItems"));
        if (body.containsKey("itinerary")) s.setItinerary((String) body.get("itinerary"));
        if (body.containsKey("isPublished")) s.setIsPublished((Boolean) body.get("isPublished"));
    }

    private PageResponse<Safari> toPageResponse(Page<Safari> page) {
        return new PageResponse<>(page.getContent(), page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize());
    }
}
