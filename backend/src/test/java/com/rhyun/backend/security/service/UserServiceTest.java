package com.rhyun.backend.security.service;

import com.rhyun.backend.globalservice.IdService;
import com.rhyun.backend.security.dto.GetUserDto;
import com.rhyun.backend.security.dto.UserDto;
import com.rhyun.backend.security.model.AppUser;
import com.rhyun.backend.security.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final IdService idService = mock(IdService.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final UserService userService = new UserService(userRepository, idService, passwordEncoder);

    private final Authentication authentication = mock(Authentication.class);
    private final SecurityContext securityContext = mock(SecurityContext.class);

    @Test
    void saveUserTest() {
        // GIVEN
        UserDto userDto = new UserDto("user1", "password123", "USER");
        AppUser userToSave = new AppUser("1", userDto.username(), userDto.password(), userDto.role());
        when(idService.randomId()).thenReturn("1");
        when(passwordEncoder.encode(userDto.password())).thenReturn("password123");
        when(userRepository.save(userToSave)).thenReturn(userToSave);

        // WHEN
        AppUser actual = userService.saveUser(userDto);

        // THEN
        AppUser expected = new AppUser("1", "user1", "password123", "USER");

        assertEquals(expected, actual);
        verify(idService, times(1)).randomId();
        verify(passwordEncoder, times(1)).encode("password123");
        verify(userRepository, times(1)).save(userToSave);
    }

    @Test
    void findUserByUsernameTest_whenUsernameExists_thenReturnUser() {
        // GIVEN
        AppUser user = new AppUser("1", "user1", "password1", "USER");
        when(userRepository.findUserByUsername("user1")).thenReturn(Optional.of(user));

        // WHEN
        AppUser actual = userService.findUserByUsername("user1");

        // THEN
        AppUser expected = new AppUser("1", "user1", "password1", "USER");

        assertEquals(expected, actual);
        verify(userRepository, times(1)).findUserByUsername("user1");
    }

    @Test
    void findUserByUsernameTest_whenUsernameDoesNotExist_thenThrow() {
        // GIVEN
        when(userRepository.findUserByUsername("user1")).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(UsernameNotFoundException.class, () -> userService.findUserByUsername("user1"));
        verify(userRepository, times(1)).findUserByUsername("user1");
    }

    @Test
    void getLoggedInUserTest_whenLoggedInUserExists_thenReturnUser() {
        // GIVEN
        User user = new User("user1", "password123", List.of());
        when(authentication.getPrincipal()).thenReturn(user);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        AppUser appUser = new AppUser("1", "user1", "password123", "USER");
        when(userRepository.findUserByUsername("user1")).thenReturn(Optional.of(appUser));

        // WHEN
        GetUserDto actual = userService.getLoggedInUser();

        // THEN
        GetUserDto expected = new GetUserDto("1", "user1", "USER");

        assertEquals(expected, actual);
        verify(userRepository, times(1)).findUserByUsername("user1");
        verify(authentication, times(1)).getPrincipal();
        verify(securityContext, times(1)).getAuthentication();
    }

    @Test
    void getLoggedInUserTest_whenLoggedInUserDoesNotExist_thenThrow() {
        // GIVEN
        User user = new User("user1", "password123", List.of());
        when(authentication.getPrincipal()).thenReturn(user);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findUserByUsername("user1")).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(UsernameNotFoundException.class, () -> userService.getLoggedInUser());
        verify(userRepository, times(1)).findUserByUsername("user1");
        verify(authentication, times(1)).getPrincipal();
        verify(securityContext, times(1)).getAuthentication();
    }
}