package com.rhyun.backend.security.service;

import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.exception.UserNotFoundException;
import com.rhyun.backend.security.model.User;
import com.rhyun.backend.security.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByGithubId(String githubId) {
        return userRepository.findUserByGithubId(githubId)
                .orElseThrow(() -> new UserNotFoundException("User with Github Id " + githubId + " cannot be found."));
    }

    public User saveUser(UserDto userDto) {
        User userToSave = new User(
                "357",
                userDto.githubId()
        );
        return userRepository.save(userToSave);
    }
}
