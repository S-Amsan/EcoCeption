package com.example.backend.controller;

import com.example.backend.model.document.Document;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.DocumentService;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/document")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<Document> uploadDocument(
        @RequestParam("cardId") Long cardId,
        @RequestParam("file") MultipartFile file,
        @AuthenticationPrincipal MyUserDetails user
    ) throws IOException {
        return ResponseEntity.ok(
            documentService.upload(cardId, file, user.getUser())
        );
    }

    @GetMapping("/all")
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }
}
