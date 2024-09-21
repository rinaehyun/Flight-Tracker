package com.rhyun.backend.flight.exception;

public class FlightNotFoundException extends RuntimeException{
    public FlightNotFoundException(String message) {
        super(message);
    }
}
