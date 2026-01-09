package com.example.backend.service;

import com.example.backend.model.Report;
import com.example.backend.repository.ReportRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public Optional<Report> getReportById(Long reportId) {
        return reportRepository.findById(reportId);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Report checkReport(Report report) {
        report.setChecked(true);
        return reportRepository.save(report);
    }
}
