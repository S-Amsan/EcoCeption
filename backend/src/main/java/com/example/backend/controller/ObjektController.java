package com.example.backend.controller;

import com.example.backend.model.Objekt;
import com.example.backend.model.http.req.ObjektPostRequest;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.ObjektService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/object")
public class ObjektController {

    @Autowired
    private ObjektService objektService;

    @PostMapping("/post")
    public ResponseEntity<Objekt> post(
        @Valid ObjektPostRequest request,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) throws IOException {
        Objekt object = objektService.postObject(
            request,
            userDetails.getUser()
        );
        return ResponseEntity.ok(object);
    }

    @GetMapping("/id/{objectId}")
    public ResponseEntity<Objekt> fetchObjectById(
        @PathVariable Long objectId,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        var maybeObject = objektService.getObjectById(objectId);

        if (maybeObject.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(maybeObject.get());
    }

    @PostMapping("/pickup/{objectId}")
    public ResponseEntity<Void> pickupObject(
        @PathVariable Long objectId,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        try {
            objektService.pickupObject(objectId, userDetails.getUser());
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all")
    public List<Objekt> getAll() {
        return objektService.getAllObjects();
    }
}
