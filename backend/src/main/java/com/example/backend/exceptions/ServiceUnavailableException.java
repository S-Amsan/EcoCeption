package com.example.backend.exceptions;

public class ServiceUnavailableException extends RuntimeException {

    public ServiceUnavailableException(String message) {
        super(message);
    }

    public ServiceUnavailableException(String serviceName, String operation) {
        super("Service unavailable: " + serviceName + " - " + operation);
    }

    public ServiceUnavailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
