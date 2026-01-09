package com.example.backend.controller;

import com.example.backend.model.Report;
import com.example.backend.service.ReportService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/all")
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }
}
