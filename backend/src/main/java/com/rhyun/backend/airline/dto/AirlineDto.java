package com.rhyun.backend.airline.dto;

public record AirlineDto(
        String iataCode,
        String businessName,
        String commonName
) {
}
