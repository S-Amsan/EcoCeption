package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.Report;
import com.example.backend.model.User;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.ReportRepository;
import com.example.backend.repository.UserRepository;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private ReportSummaryService reportSummaryService;

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

    public Report createReport(Long postId, Long userId, String reason)
        throws IOException, URISyntaxException, InterruptedException {
        Post post = postRepository
            .findById(postId)
            .orElseThrow(() -> new RuntimeException("Post introuvable"));

        User user = userRepository
            .findById(userId)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Report report = new Report();
        report.setPost(post);
        report.setUser(user);
        report.setReason(reason);
        report.setChecked(null);
        report.setSummary(reportSummaryService.generateSummary(post));

        return reportRepository.save(report);
    }
}
