package com.rhyun.backend.flight.dto;

import com.rhyun.backend.flight.model.Airline;
import com.rhyun.backend.flight.model.FlightStatus;
import lombok.With;

@With
public record FlightDto(
        String flightCode,
        Airline airline,
        String origin,
        String destination,
        String aircraftType,
        FlightStatus flightStatus
) {
}
