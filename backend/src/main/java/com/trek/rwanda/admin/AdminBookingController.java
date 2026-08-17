package com.trek.rwanda.admin;

import com.trek.rwanda.booking.Booking;
import com.trek.rwanda.booking.BookingRepository;
import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
public class AdminBookingController {

    private final BookingRepository bookingRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<Booking>>> list(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Page<Booking> bookings;
        if (status != null && !status.isEmpty()) {
            bookings = bookingRepository.findByStatusOrderByCreatedAtDesc(status, PageRequest.of(page, size));
        } else {
            bookings = bookingRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
        }

        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(bookings)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Booking>> get(@PathVariable String id) {
        Booking b = bookingRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        return ResponseEntity.ok(ApiResponse.ok(b));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Booking>> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        Booking b = bookingRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        b.setStatus(body.get("status"));
        bookingRepository.save(b);
        return ResponseEntity.ok(ApiResponse.ok(b, "Status updated"));
    }

    @PutMapping("/{id}/notes")
    public ResponseEntity<ApiResponse<Booking>> updateNotes(@PathVariable String id, @RequestBody Map<String, String> body) {
        Booking b = bookingRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        b.setAdminNotes(body.get("adminNotes"));
        bookingRepository.save(b);
        return ResponseEntity.ok(ApiResponse.ok(b, "Notes updated"));
    }

    private PageResponse<Booking> toPageResponse(Page<Booking> page) {
        return new PageResponse<>(page.getContent(), page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize());
    }
}
