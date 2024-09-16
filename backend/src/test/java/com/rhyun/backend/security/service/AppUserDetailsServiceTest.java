package com.rhyun.backend.security.service;

import com.rhyun.backend.security.model.AppUser;
import com.rhyun.backend.security.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppUserDetailsServiceTest {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final AppUserDetailsService appUserDetailsService = new AppUserDetailsService(userRepository);

    @Test
    void loadUserByUsernameTest_whenUsernameExists_thenReturnUser() {
        // GIVEN
        AppUser appUser = new AppUser("1", "user1", "password123", "USER");
        when(userRepository.findUserByUsername("user1")).thenReturn(Optional.of(appUser));

        // WHEN
        UserDetails actual = appUserDetailsService.loadUserByUsername("user1");

        // THEN
        UserDetails expected = new User(appUser.username(), appUser.password(), List.of(new SimpleGrantedAuthority(appUser.role())));

        assertEquals(expected, actual);
        verify(userRepository, times(1)).findUserByUsername("user1");
    }

    @Test
    void loadUserByUsernameTest_whenUsernameDoesNotExist_thenThrow() {
        // GIVEN
        when(userRepository.findUserByUsername("user1")).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(UsernameNotFoundException.class, () -> appUserDetailsService.loadUserByUsername("user1"));
        verify(userRepository, times(1)).findUserByUsername("user1");
    }
}