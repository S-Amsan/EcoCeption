package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.Report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private ReportService reportService;

    @Autowired
    private PostService postService;

    public Report checkReport(Long reportId) {
        var maybeReport = reportService.getReportById(reportId);

        if (maybeReport.isEmpty()) {
            throw new IllegalArgumentException("Report not found");
        }

        return reportService.checkReport(maybeReport.get());
    }

    public Post invalidatePost(Long postId) {
        var maybePost = postService.getPostById(postId);

        if (maybePost.isEmpty()) {
            throw new IllegalArgumentException("Post not found");
        }

        return postService.invalidatePost(maybePost.get());
    }
}
