package com.example.backend.service;

import com.example.backend.model.Purchase;
import com.example.backend.repository.PurchaseRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    public Optional<Purchase> findById(long id) {
        return purchaseRepository.findById(id);
    }
}
