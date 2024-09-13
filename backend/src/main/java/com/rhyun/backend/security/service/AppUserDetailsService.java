package com.rhyun.backend.security.service;

import com.rhyun.backend.security.model.AppUser;
import com.rhyun.backend.security.model.AppUserRole;
import com.rhyun.backend.security.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public AppUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with " + username + " cannot be found."));

        return new User(
                appUser.username(),
                appUser.password(),
                List.of(
                        new SimpleGrantedAuthority("ROLE_" + appUser.role())
                )

        );
    }
}
