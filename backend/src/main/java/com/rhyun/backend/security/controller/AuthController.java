package com.rhyun.backend.security.controller;

import com.rhyun.backend.security.dto.GetUserDto;
import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.model.User;
import com.rhyun.backend.security.service.UserService;
import org.springframework.http.HttpStatus;
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

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody UserDto userDto) {
        return userService.saveUser(userDto);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void login() {
        // This method is used to trigger the login process
    }

    @GetMapping("/me")
    public GetUserDto getLoggedInUser() {
        return userService.getLoggedInUser();
    }

}
