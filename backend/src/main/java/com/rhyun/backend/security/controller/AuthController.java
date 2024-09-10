package com.rhyun.backend.security.controller;

import com.rhyun.backend.security.model.User;
import com.rhyun.backend.security.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public User getLoggedInUser(@AuthenticationPrincipal OAuth2User user) {
        if (user != null)  return userService.getUserByGithubId(user.getAttributes().get("login").toString());
        return null;
    }
}
