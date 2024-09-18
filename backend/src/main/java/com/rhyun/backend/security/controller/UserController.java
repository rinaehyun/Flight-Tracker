package com.rhyun.backend.security.controller;

import com.rhyun.backend.airport.dto.GetAirportDto;
import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.security.dto.GetUserDto;
import com.rhyun.backend.security.dto.PutUserDto;
import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.model.AppUser;
import com.rhyun.backend.security.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.rhyun.backend.utils.StringHelper.capitalizeFirstLetter;

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
