package com.rhyun.backend.airport.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document(collection = "airports")
public record Airport(
        String id,
        String name,
        String iataCode,
        GeoCode geoCode,
        AirportAddress address,
        AirportTimeZone timeZone
) {
}
