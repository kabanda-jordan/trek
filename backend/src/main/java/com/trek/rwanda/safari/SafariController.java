package com.trek.rwanda.safari;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/safaris")
@RequiredArgsConstructor
public class SafariController {

    private final SafariRepository safariRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Safari>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String destination,
            @RequestParam(defaultValue = "name,asc") String sort) {

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Safari> safaris = safariRepository.findByIsPublishedTrue(pageRequest);

        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(safaris)));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Safari>> getBySlug(@PathVariable String slug) {
        Safari safari = safariRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Safari not found: " + slug));
        return ResponseEntity.ok(ApiResponse.ok(safari));
    }

    private PageResponse<Safari> toPageResponse(Page<Safari> page) {
        return new PageResponse<>(
                page.getContent(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getSize()
        );
    }
}
