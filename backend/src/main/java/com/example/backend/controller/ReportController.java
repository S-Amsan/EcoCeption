package com.example.backend.controller;

import com.example.backend.model.Report;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.ReportService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.backend.model.http.req.PostReportRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;



@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/{postId}")
    public ResponseEntity<Void> reportPost(
            @PathVariable Long postId,
            @Valid @RequestBody PostReportRequest request,
            @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        System.out.println(">>> REPORT CONTROLLER HIT <<<");

        reportService.createReport(
                postId,
                userDetails.getUser().getId(),
                request.getReason()
        );

        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }
}

