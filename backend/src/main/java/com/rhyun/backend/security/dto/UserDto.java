package com.rhyun.backend.security.dto;

import com.rhyun.backend.security.model.AppUserRole;

public record UserDto(
    String username,
    String password,
    AppUserRole role
) {
}
