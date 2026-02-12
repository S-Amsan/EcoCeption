package com.example.backend.controller;

import com.example.backend.model.Report;
import com.example.backend.model.http.req.PostReportRequest;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.ReportService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/{postId}")
    public ResponseEntity<Report> reportPost(
        @PathVariable Long postId,
        @Valid @RequestBody PostReportRequest request,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) throws IOException, URISyntaxException, InterruptedException {
        Report report = reportService.createReport(
            postId,
            userDetails.getUser().getId(),
            request.getReason()
        );

        return ResponseEntity.ok(report);
    }

    @GetMapping("/all")
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }
}
