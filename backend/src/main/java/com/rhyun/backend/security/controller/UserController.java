package com.rhyun.backend.security.controller;

import com.rhyun.backend.security.dto.PutUserDto;
import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.model.AppUser;
import com.rhyun.backend.security.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable String id) {
        return userService.findUserById(id);
    }

    @PutMapping("/{id}")
    public AppUser updateUser(
            @PathVariable String id,
            @RequestBody PutUserDto putUserDto
    ){
        return userService.updateUser(id, putUserDto);
    }
}
