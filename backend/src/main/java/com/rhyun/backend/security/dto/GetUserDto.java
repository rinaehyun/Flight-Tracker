package com.rhyun.backend.security.dto;

public record GetUserDto(
    String id,
    String username,
    String role
) {
}
