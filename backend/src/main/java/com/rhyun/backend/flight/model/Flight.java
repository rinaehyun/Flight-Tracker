package com.rhyun.backend.flights.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "flights")
public record Flight(
        String id,
        String airlineCode,
        String airlineICAO
) {
}
