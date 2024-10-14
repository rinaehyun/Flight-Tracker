package com.rhyun.backend.airline.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "airlines")
@With
public record Airline(
    String id,
    String iataCode,
    String businessName,
    String commonName
) {
}
