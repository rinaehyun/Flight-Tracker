package com.rhyun.backend.flight.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "flights")
@With
public record Flight(
        String id,
        String flightCode,
        Airline airline,
        String origin,
        String destination,
        String aircraftType,
        FlightStatus flightStatus
) {
}
