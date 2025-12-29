package com.example.backend.controller;

import com.example.backend.model.Donation;
import com.example.backend.repository.DonationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/donation")
public class DonationController {

    @Autowired
    private DonationRepository donationRepository;

    @GetMapping("/all")
    public List<Donation> createDonation() {
        return donationRepository.findAll();
    }
}
