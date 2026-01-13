package com.example.backend.service;

import com.example.backend.exceptions.FileUploadException;
import com.example.backend.model.http.req.PartnerAddRequest;
import com.example.backend.model.http.res.FileUploadResponse;
import com.example.backend.model.partner.Partner;
import com.example.backend.repository.PartnerRepository;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartnerService {

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private FileUploadService fileUploadService;

    public List<Partner> getAll() {
        return partnerRepository.findAll();
    }

    public Optional<Partner> getById(Long id) {
        return partnerRepository.findById(id);
    }

    public Partner addPartner(PartnerAddRequest request) {
        Partner partner = new Partner();
        partner.setName(request.getName());
        partner.setType(request.getType());

        FileUploadResponse fileUploadResponse;

        try {
            fileUploadResponse = fileUploadService.upload(request.getImage());
        } catch (IOException e) {
            throw new FileUploadException("Failed to upload card photo", e);
        }

        partner.setImageUrl(
            FileUploadService.endpoint.toString() +
                '/' +
                fileUploadResponse.getFilename()
        );
        return partnerRepository.save(partner);
    }

    public Partner deletePartner(Long partnerId) {
        return partnerRepository
            .findById(partnerId)
            .map(partner -> {
                partnerRepository.delete(partner);
                return partner;
            })
            .orElseThrow(() -> new RuntimeException("Partner not found"));
    }
}
