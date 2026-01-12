package com.example.backend.controller;

import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/store")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @PostMapping("/buy/{purchaseId}")
    public ResponseEntity<Void> buy(
        @PathVariable Long purchaseId,
        @AuthenticationPrincipal MyUserDetails user
    ) {
        try {
            storeService.buy(purchaseId, user.getUser());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().build();
    }
}
