package com.example.backend.exceptions;

import org.springframework.security.core.AuthenticationException;

public class LoginException extends AuthenticationException {

    public LoginException(String msg) {
        super(msg);
    }

    public LoginException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
