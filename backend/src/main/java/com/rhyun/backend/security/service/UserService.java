package com.rhyun.backend.security.service;

import com.rhyun.backend.globalservice.IdService;
import com.rhyun.backend.security.dto.GetUserDto;
import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.model.User;
import com.rhyun.backend.security.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, IdService idService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.idService = idService;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(UserDto userDto) {
        User userToSave = new User(
                idService.randomId(),
                userDto.username(),
                passwordEncoder.encode(userDto.password()),
                userDto.role()
        );
        return userRepository.save(userToSave);
    }

    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with " + username + " cannot be found."));
    }

    public GetUserDto getLoggedInUser() {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = findUserByUsername(principal.username());
        return new GetUserDto(user.username(), user.role());
    }
}
