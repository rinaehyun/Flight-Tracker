package com.rhyun.backend.security.dto;

import com.rhyun.backend.security.model.AppUserRole;

public record PutUserDto(
        String password,
        AppUserRole role
) {
}
