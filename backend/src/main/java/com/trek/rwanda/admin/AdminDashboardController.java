package com.trek.rwanda.admin;

import com.trek.rwanda.booking.BookingService;
import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.destination.DestinationRepository;
import com.trek.rwanda.safari.SafariRepository;
import com.trek.rwanda.user.UserRepository;
import com.trek.rwanda.vehicle.VehicleRepository;
import com.trek.rwanda.company.VehicleCompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final DestinationRepository destinationRepository;
    private final SafariRepository safariRepository;
    private final VehicleRepository vehicleRepository;
    private final VehicleCompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalDestinations", destinationRepository.count());
        stats.put("totalSafaris", safariRepository.count());
        stats.put("totalVehicles", vehicleRepository.count());
        stats.put("totalCompanies", companyRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("totalBookings", bookingService.getAllBookings(org.springframework.data.domain.PageRequest.of(0, 1)).getTotalElements());
        stats.put("pendingBookings", bookingService.countByStatus("PENDING"));
        stats.put("confirmedBookings", bookingService.countByStatus("CONFIRMED"));

        return ResponseEntity.ok(ApiResponse.ok(stats));
    }
}
