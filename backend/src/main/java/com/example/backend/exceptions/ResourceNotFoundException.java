package com.example.backend.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String resourceType, Object id) {
        super(resourceType + " not found with id: " + id);
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
