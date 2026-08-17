package com.trek.rwanda.company;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final VehicleCompanyRepository companyRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<VehicleCompany>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Page<VehicleCompany> companies = companyRepository.findByIsActiveTrue(PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.ok(toPageResponse(companies)));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<VehicleCompany>> getBySlug(@PathVariable String slug) {
        VehicleCompany company = companyRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Company not found: " + slug));
        return ResponseEntity.ok(ApiResponse.ok(company));
    }

    private PageResponse<VehicleCompany> toPageResponse(Page<VehicleCompany> page) {
        return new PageResponse<>(
                page.getContent(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getSize()
        );
    }
}
