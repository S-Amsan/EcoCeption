package com.example.backend.service;

import com.example.backend.exceptions.FileUploadException;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.model.Card;
import com.example.backend.model.http.req.CardPublishRequest;
import com.example.backend.model.http.res.FileUploadResponse;
import com.example.backend.model.partner.Partner;
import com.example.backend.repository.CardRepository;
import java.io.IOException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final PartnerService partnerService;
    private final FileUploadService fileUploadService;

    public CardService(
        CardRepository cardRepository,
        PartnerService partnerService,
        FileUploadService fileUploadService
    ) {
        this.cardRepository = cardRepository;
        this.partnerService = partnerService;
        this.fileUploadService = fileUploadService;
    }

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Card getCardById(Long id) {
        return cardRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Card", id));
    }

    public Card publish(CardPublishRequest request) {
        Card card = new Card();

        card.setTitle(request.getTitle());
        card.setDescription(request.getDescription());
        card.setPoints(request.getPoints());

        if (request.getPartnerId() != null) {
            Partner partner = partnerService
                .getById(request.getPartnerId())
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Partner",
                        request.getPartnerId()
                    )
                );
            card.setPartner(partner);
        }

        try {
            FileUploadResponse fileUploadResponse = fileUploadService.upload(
                request.getPhoto()
            );

            card.setPhotoUrl(
                FileUploadService.endpoint +
                    "/" +
                    fileUploadResponse.getFilename()
            );
        } catch (IOException e) {
            throw new FileUploadException("Failed to upload card photo", e);
        }

        return cardRepository.save(card);
    }

    public Card deleteCardById(Long cardId) {
        Card card = cardRepository.findById(cardId).orElseThrow();
        cardRepository.delete(card);
        return card;
    }
}
