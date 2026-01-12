package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.model.donation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreService {

    @Autowired
    private ActionService actionService;

    @Autowired
    private PurchaseService purchaseService;

    @Autowired
    private RewardService rewardService;

    public void buy(Long purchaseId, User user)
        throws IllegalArgumentException {
        Purchase purchase = purchaseService
            .findById(purchaseId)
            .orElseThrow(() ->
                new IllegalArgumentException("Purchase not found")
            );

        rewardService.onPurchase(user, purchase);
        Donation donation = purchase.getDonation();

        if (donation != null) {
            rewardService.maybeGainFlame(user);
        }

        actionService.onPurchase(user);
    }
}
