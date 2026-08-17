package com.trek.rwanda.booking;

import com.trek.rwanda.user.User;
import com.trek.rwanda.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public Booking createBooking(CreateBookingRequest request, UUID userId) {
        String ref = generateBookingRef();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Booking booking = Booking.builder()
                .bookingRef(ref)
                .user(user)
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .customerPhone(request.getCustomerPhone())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .participants(request.getParticipants())
                .specialRequests(request.getSpecialRequests())
                .status("PENDING")
                .paymentStatus("UNPAID")
                .build();

        return bookingRepository.save(booking);
    }

    public Page<Booking> getUserBookings(UUID userId, Pageable pageable) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    }

    public Page<Booking> getAllBookings(Pageable pageable) {
        return bookingRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public Page<Booking> getBookingsByStatus(String status, Pageable pageable) {
        return bookingRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
    }

    public long countByStatus(String status) {
        return bookingRepository.countByStatus(status);
    }

    private String generateBookingRef() {
        long count = bookingRepository.count();
        return String.format("TR-%d-%04d", java.time.Year.now().getValue(), count + 1);
    }
}
