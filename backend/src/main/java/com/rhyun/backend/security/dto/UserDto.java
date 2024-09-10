package com.rhyun.backend.security.dto;

public record UserDto(
    String githubId,
    String role
) {
}
