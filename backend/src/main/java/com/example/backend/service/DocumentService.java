package com.example.backend.service;

import com.example.backend.exceptions.FileUploadException;
import com.example.backend.model.Card;
import com.example.backend.model.User;
import com.example.backend.model.document.Document;
import com.example.backend.model.document.DocumentState;
import com.example.backend.repository.CardRepository;
import com.example.backend.repository.DocumentRepository;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private CardRepository cardRepository;

    public Document upload(Long cardId, MultipartFile file, User user)
        throws IOException {
        var response = fileUploadService.upload(file);

        if (response.getError() != null) {
            throw new FileUploadException(response.getError());
        }

        Card card = cardRepository.findById(cardId).orElseThrow();

        Document document = new Document();
        document.setUser(user);
        document.setCard(card);
        document.setFileUrl(
            FileUploadService.endpoint + "/" + response.getFilename()
        );

        return documentRepository.save(document);
    }

    public Optional<Document> getDocumentById(Long documentId) {
        return documentRepository.findById(documentId);
    }

    public Document changeValidationStatusOf(
        Document document,
        DocumentState state
    ) {
        document.setState(state);
        return documentRepository.save(document);
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
}
