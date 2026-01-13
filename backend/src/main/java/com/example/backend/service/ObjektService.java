package com.example.backend.service;

import com.example.backend.exceptions.BusinessLogicException;
import com.example.backend.exceptions.FileUploadException;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.model.Objekt;
import com.example.backend.model.User;
import com.example.backend.model.http.req.ObjektPostRequest;
import com.example.backend.repository.ObjektRepository;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ObjektService {

    @Autowired
    private ObjektRepository objektRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private RewardService rewardService;

    @Autowired
    private SuccessService successService;

    public Objekt postObject(ObjektPostRequest request, User publisher)
        throws IOException {
        var uploadResponse = fileUploadService.upload(request.getImage());

        if (uploadResponse.getError() != null) {
            throw new FileUploadException(
                "Error uploading post image: " + uploadResponse.getError()
            );
        }

        Objekt object = new Objekt();
        object.setPublishedBy(publisher);
        object.setTitle(request.getTitle());
        object.setDescription(request.getDescription());
        object.setAddress(request.getAddress());
        object.setPickedUpBy(null);
        object.setPhotoUrl(
            FileUploadService.endpoint.toString() +
                '/' +
                uploadResponse.getFilename()
        );

        return objektRepository.save(object);
    }

    public Optional<Objekt> getObjectById(Long objectId) {
        return objektRepository.findById(objectId);
    }

    public Objekt pickupObject(Long objectId, User picker) {
        var maybeObject = objektRepository.findById(objectId);

        if (maybeObject.isEmpty()) {
            throw new ResourceNotFoundException("Object", objectId);
        }

        var object = maybeObject.get();

        if (object.getPickedUpBy() != null) {
            throw new BusinessLogicException(
                "Object has already been picked up"
            );
        }

        object.setPickedUpBy(picker);
        var savedObject = objektRepository.save(object);

        // Trigger reward and success processing
        rewardService.onObjectPickup(savedObject);
        successService.onObjectPickup(picker);

        return savedObject;
    }

    public List<Objekt> getAllObjects() {
        return objektRepository.findAll();
    }
}
