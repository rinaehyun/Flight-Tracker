package com.rhyun.backend.airport.model;

public record AirportAddress(
        String countryName,
        String countryCode,
        String regionCode
) {
}
