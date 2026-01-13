package com.example.backend.exceptions;

public class InvalidRequestException extends RuntimeException {

    public InvalidRequestException(String message) {
        super(message);
    }

    public InvalidRequestException(String field, String reason) {
        super("Invalid request for field '" + field + "': " + reason);
    }

    public InvalidRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
