package com.example.backend.exceptions;

public class AccountAlreadyExistsException extends RuntimeException {

    public enum Type {
        EMAIL("email"),
        PSEUDO("pseudo");

        private final String conflictType;

        Type(String conflictType) {
            this.conflictType = conflictType;
        }

        @Override
        public String toString() {
            return conflictType;
        }
    }

    public AccountAlreadyExistsException(
        final Type conflictType,
        final String conflict
    ) {
        super("Account already exists for " + conflictType + ": " + conflict);
    }
}
