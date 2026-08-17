package com.trek.rwanda.destination;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/destinations")
@RequiredArgsConstructor
public class DestinationController {

    private final DestinationRepository destinationRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Destination>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String district,
            @RequestParam(defaultValue = "name,asc") String sort) {

        String[] sortParts = sort.split(",");
        Sort sortBy = Sort.by(Sort.Direction.fromString(sortParts.length > 1 ? sortParts[1] : "asc"), sortParts[0]);
        PageRequest pageRequest = PageRequest.of(page, size, sortBy);

        Page<Destination> destinations;
        if (district != null && !district.isEmpty()) {
            destinations = destinationRepository.findByDistrictIgnoreCase(district, pageRequest);
        } else {
            destinations = destinationRepository.findByIsPublishedTrue(pageRequest);
        }

        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(destinations)));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Destination>> getBySlug(@PathVariable String slug) {
        Destination destination = destinationRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Destination not found: " + slug));
        return ResponseEntity.ok(ApiResponse.ok(destination));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageResponse<Destination>>> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        Page<Destination> results = destinationRepository.search(q, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(results)));
    }

    private PageResponse<Destination> toPageResponse(Page<Destination> page) {
        return new PageResponse<>(
                page.getContent(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getSize()
        );
    }
}
