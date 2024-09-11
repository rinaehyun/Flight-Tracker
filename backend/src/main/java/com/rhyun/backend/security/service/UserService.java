package com.rhyun.backend.security.service;

import com.rhyun.backend.globalservice.IdService;
import com.rhyun.backend.security.dto.GetUserDto;
import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.exception.UserNotFoundException;
import com.rhyun.backend.security.model.User;
import com.rhyun.backend.security.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final IdService idService;

    public UserService(UserRepository userRepository, IdService idService) {
        this.userRepository = userRepository;
        this.idService = idService;
    }

    public User saveUser(UserDto userDto) {
        User userToSave = new User(
                idService.randomId(),
                userDto.username(),
                userDto.password(),
                userDto.passwordConfirmation(),
                userDto.role()
        );
        return userRepository.save(userToSave);
    }
}
