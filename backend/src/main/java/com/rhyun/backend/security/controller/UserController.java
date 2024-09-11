package com.rhyun.backend.security.controller;

import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.model.User;
import com.rhyun.backend.security.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody UserDto userDto) {
        return userService.saveUser(userDto);
    }
}
