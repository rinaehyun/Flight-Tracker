package com.rhyun.backend.airport.dto;

import com.rhyun.backend.airport.model.AirportAddress;
import com.rhyun.backend.airport.model.AirportTimeZone;
import com.rhyun.backend.airport.model.GeoCode;

public record AirportDto(
    String name,
    String iataCode,
    GeoCode geoCode,
    AirportAddress address,
    AirportTimeZone timeZone
) {
}
