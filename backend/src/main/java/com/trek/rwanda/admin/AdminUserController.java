package com.trek.rwanda.admin;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.PageResponse;
import com.trek.rwanda.user.User;
import com.trek.rwanda.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<User>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<User> users = userRepository.findAll(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(users)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> get(@PathVariable String id) {
        User u = userRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return ResponseEntity.ok(ApiResponse.ok(u));
    }

    @PutMapping("/{id}/ban")
    public ResponseEntity<ApiResponse<User>> ban(@PathVariable String id) {
        User u = userRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        u.setIsActive(false);
        userRepository.save(u);
        return ResponseEntity.ok(ApiResponse.ok(u, "User banned"));
    }

    @PutMapping("/{id}/unban")
    public ResponseEntity<ApiResponse<User>> unban(@PathVariable String id) {
        User u = userRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        u.setIsActive(true);
        userRepository.save(u);
        return ResponseEntity.ok(ApiResponse.ok(u, "User unbanned"));
    }

    private PageResponse<User> toPageResponse(Page<User> page) {
        return new PageResponse<>(page.getContent(), page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize());
    }
}
