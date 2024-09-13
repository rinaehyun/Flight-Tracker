package com.rhyun.backend.airport.dto;

public record GetAirportAddressDto(
        String countryName,
        String countryCode,
        String regionCode
) {
}
