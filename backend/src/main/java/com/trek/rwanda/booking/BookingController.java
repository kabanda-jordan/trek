package com.trek.rwanda.booking;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.user.User;
import com.trek.rwanda.user.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<Booking>> createBooking(
            @Valid @RequestBody CreateBookingRequest request,
            Authentication auth) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Booking booking = bookingService.createBooking(request, user.getId());
        return ResponseEntity.ok(ApiResponse.ok(booking, "Booking created"));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<Page<Booking>>> getMyBookings(
            Authentication auth,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Page<Booking> bookings = bookingService.getUserBookings(user.getId(), PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.ok(bookings));
    }
}
