package com.rhyun.backend.security.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public record User(
    String id,
    String username,
    String password,
    String role
) {
}
