package com.rhyun.backend.airport.exception;

public class AirportNotFoundException extends RuntimeException{
    public AirportNotFoundException(String message) {
        super(message);
    }
}
