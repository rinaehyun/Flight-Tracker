package com.rhyun.backend.flight.dto;

import com.rhyun.backend.flight.model.Airline;
import com.rhyun.backend.flight.model.FlightStatus;
import lombok.With;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@With
public record FlightDto(
        String flightCode,
        Airline airline,
        String origin,
        String destination,
        LocalDateTime departureTime,
        LocalDateTime arrivalTime,
        String aircraftType,
        FlightStatus flightStatus
) {
}
