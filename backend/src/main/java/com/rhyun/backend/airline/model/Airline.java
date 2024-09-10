package com.rhyun.backend.airline.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "airlines")
public record Airline(
    String id,
    String type,
    String iataCode,
    String icaoCode,
    String businessName,
    String commonName
) {
}
