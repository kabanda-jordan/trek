package com.trek.rwanda.admin;

import com.trek.rwanda.common.ApiResponse;
import com.trek.rwanda.common.SlugUtil;
import com.trek.rwanda.company.VehicleCompany;
import com.trek.rwanda.company.VehicleCompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/companies")
@RequiredArgsConstructor
public class AdminCompanyController {

    private final VehicleCompanyRepository companyRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<java.util.List<VehicleCompany>>> list() {
        return ResponseEntity.ok(ApiResponse.ok(companyRepository.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VehicleCompany>> get(@PathVariable String id) {
        VehicleCompany c = companyRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));
        return ResponseEntity.ok(ApiResponse.ok(c));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<VehicleCompany>> create(@RequestBody Map<String, Object> body) {
        VehicleCompany c = new VehicleCompany();
        applyFields(c, body);
        companyRepository.save(c);
        return ResponseEntity.ok(ApiResponse.ok(c, "Company created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<VehicleCompany>> update(@PathVariable String id, @RequestBody Map<String, Object> body) {
        VehicleCompany c = companyRepository.findById(java.util.UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));
        applyFields(c, body);
        companyRepository.save(c);
        return ResponseEntity.ok(ApiResponse.ok(c, "Company updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        companyRepository.deleteById(java.util.UUID.fromString(id));
        return ResponseEntity.ok(ApiResponse.ok(null, "Company deleted"));
    }

    private void applyFields(VehicleCompany c, Map<String, Object> body) {
        if (body.containsKey("name")) {
            c.setName((String) body.get("name"));
            if (c.getSlug() == null || c.getSlug().isEmpty()) {
                c.setSlug(SlugUtil.toSlug((String) body.get("name")));
            }
        }
        if (body.containsKey("description")) c.setDescription((String) body.get("description"));
        if (body.containsKey("phone")) c.setPhone((String) body.get("phone"));
        if (body.containsKey("email")) c.setEmail((String) body.get("email"));
        if (body.containsKey("website")) c.setWebsite((String) body.get("website"));
        if (body.containsKey("address")) c.setAddress((String) body.get("address"));
        if (body.containsKey("logoUrl")) c.setLogoUrl((String) body.get("logoUrl"));
    }
}
