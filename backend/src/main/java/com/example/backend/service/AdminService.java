package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.Report;
import com.example.backend.model.User;
import com.example.backend.model.document.Document;
import com.example.backend.model.document.DocumentState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private ReportService reportService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private DocumentService documentService;

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

    private User changeUserBanStatus(Long userId, boolean banned) {
        var maybeUser = userService.getUserById(userId);

        if (maybeUser.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        return userService.changeBanStatusOf(maybeUser.get(), banned);
    }

    public User banUser(Long userId) {
        return changeUserBanStatus(userId, true);
    }

    public User unbanUser(Long userId) {
        return changeUserBanStatus(userId, false);
    }

    private Document changeDocumentState(Long documentId, DocumentState state) {
        var maybeDocument = documentService.getDocumentById(documentId);

        if (maybeDocument.isEmpty()) {
            throw new IllegalArgumentException("Document not found");
        }

        return documentService.changeValidationStatusOf(
            maybeDocument.get(),
            state
        );
    }

    public Document validateDocument(Long documentId) {
        return changeDocumentState(documentId, DocumentState.VALIDATED);
    }

    public Document invalidateDocument(Long documentId) {
        return changeDocumentState(documentId, DocumentState.REJECTED);
    }
}
