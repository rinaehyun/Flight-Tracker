package com.rhyun.backend.flight.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "flights")
public record Flight(
        String id,
        String airlineCode,
        String airlineICAO
) {
}
