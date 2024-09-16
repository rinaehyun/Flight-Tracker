package com.rhyun.backend.security.dto;

public record UserDto(
    String username,
    String password,
    String role
) {
}
