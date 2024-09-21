package com.rhyun.backend.flight.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Duration;
import java.time.LocalDateTime;

@Document(collection = "flights")
@With
public record Flight(
        String id,
        String flightCode,
        Airline airline,
        String origin,
        String destination,
        LocalDateTime departureTime,
        LocalDateTime arrivalTime,
        String aircraftType,
        FlightStatus flightStatus,
        Duration duration
) {
}
