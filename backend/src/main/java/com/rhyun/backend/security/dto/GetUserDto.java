package com.rhyun.backend.security.dto;

import com.rhyun.backend.security.model.AppUserRole;

public record GetUserDto(
    String id,
    String username,
    AppUserRole role
) {
}
