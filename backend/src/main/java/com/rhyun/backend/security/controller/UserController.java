package com.rhyun.backend.security.controller;

import com.rhyun.backend.security.model.User;
import com.rhyun.backend.security.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{githubId}")
    public User getUserByGithubId(@PathVariable String githubId) {
        return userService.getUserByGithubId(githubId);
    }
}
