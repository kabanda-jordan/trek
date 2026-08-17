package com.trek.rwanda.admin;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.review.Review;
import com.trek.rwanda.review.ReviewRepository;
import com.trek.rwanda.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/reviews")
@RequiredArgsConstructor
public class AdminReviewController {

    private final ReviewRepository reviewRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Review>>> list(
            @RequestParam(required = false, defaultValue = "false") boolean approved,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Page<Review> reviews;
        if (!approved) {
            reviews = reviewRepository.findByIsApprovedFalseOrderByCreatedAtDesc(PageRequest.of(page, size));
        } else {
            reviews = reviewRepository.findAll(PageRequest.of(page, size));
        }

        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(reviews)));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<Review>> approve(@PathVariable String id) {
        Review r = reviewRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));
        r.setIsApproved(true);
        reviewRepository.save(r);
        return ResponseEntity.ok(ApiResponse.ok(r, "Review approved"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        reviewRepository.deleteById(java.util.UUID.fromString(id));
        return ResponseEntity.ok(ApiResponse.ok(null, "Review deleted"));
    }

    private PageResponse<Review> toPageResponse(Page<Review> page) {
        return new PageResponse<>(page.getContent(), page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize());
    }
}
