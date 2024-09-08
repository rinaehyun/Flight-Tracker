package com.rhyun.backend.globalexception;

import com.rhyun.backend.airport.exception.AirportNotFoundException;
import com.rhyun.backend.flight.exception.FlightNotFountException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FlightNotFountException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleFlightException(FlightNotFountException ex) {
        return new ErrorMessage(
                new Date(),
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage()
        );
    }

    @ExceptionHandler(AirportNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleAirportException(AirportNotFoundException ex) {
        return new ErrorMessage(
                new Date(),
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage()
        );
    }
}
