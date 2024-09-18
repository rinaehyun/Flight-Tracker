package com.rhyun.backend.security.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@With
public record AppUser(
        String id,
        String username,
        String password,
        AppUserRole role
) {
}
