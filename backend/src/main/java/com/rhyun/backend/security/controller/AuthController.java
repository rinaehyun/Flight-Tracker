package com.rhyun.backend.security.controller;

import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.service.UserService;
import org.springframework.http.HttpStatus;
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
    public Object register(@RequestBody UserDto userDto) {
        return userService.saveUser(userDto);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void login() {
        // This method is used to trigger the login process
    }

    @GetMapping("/me")
    public Object getLoggedInUser() {
        return userService.getLoggedInUser();
    }
}
