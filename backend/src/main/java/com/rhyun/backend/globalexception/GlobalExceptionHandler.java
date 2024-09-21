package com.rhyun.backend.globalexception;

import com.rhyun.backend.airport.exception.AirportNotFoundException;
import com.rhyun.backend.flight.exception.FlightNotFoundException;
import com.rhyun.backend.security.exception.UserAlreadyExistsException;
import com.rhyun.backend.security.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FlightNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleFlightException(FlightNotFoundException ex) {
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

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleUserException(UserNotFoundException ex) {
        return new ErrorMessage(
                new Date(),
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage()
        );
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return new ErrorMessage(
                new Date(),
                HttpStatus.CONFLICT.value(),
                ex.getMessage()
        );
    }
}
