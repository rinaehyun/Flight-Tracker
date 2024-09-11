package com.rhyun.backend.security.dto;

public record GetUserDto(
    String username,
    String role
) {
}
