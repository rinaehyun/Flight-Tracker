package com.rhyun.backend.security.service;

import com.rhyun.backend.globalservice.IdService;
import com.rhyun.backend.security.dto.GetUserDto;
import com.rhyun.backend.security.dto.PutUserDto;
import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.exception.UserNotFoundException;
import com.rhyun.backend.security.model.AppUser;
import com.rhyun.backend.security.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
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

    public AppUser saveUser(UserDto userDto) {
        AppUser appUserToSave = new AppUser(
                idService.randomId(),
                userDto.username(),
                passwordEncoder.encode(userDto.password()),
                userDto.role()
        );
        return userRepository.save(appUserToSave);
    }

    public AppUser findUserByUsername(String username) {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with " + username + " cannot be found."));
    }

    public GetUserDto getLoggedInUser() {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        AppUser appUser = findUserByUsername(principal.getUsername());
        return new GetUserDto(appUser.id(), appUser.username(), appUser.role());
    }

    public UserDto findUserById(String id) {
        AppUser appUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id" + id + " cannot be found."));

        return new UserDto(
                appUser.username(),
                appUser.password(),
                appUser.role()
        );
    }

    public AppUser updateUser(String id, PutUserDto putUserDto) {
        AppUser appUserToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id" + id + " cannot be found."))
                .withPassword(passwordEncoder.encode(putUserDto.password()))
                .withRole(putUserDto.role());

        return userRepository.save(appUserToUpdate);
    }
}
