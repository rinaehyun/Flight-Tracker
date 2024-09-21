package com.rhyun.backend.security.controller;

import com.rhyun.backend.security.model.AppUser;
import com.rhyun.backend.security.model.AppUserRole;
import com.rhyun.backend.security.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    UserRepository userRepository;


    @Test
    @DirtiesContext
    @WithMockUser(username = "user1")
    void getLoggedInUserTest() throws Exception {
        // GIVEN
        userRepository.save(new AppUser("1", "user1", "password123", AppUserRole.ADMIN));

        // WHEN
        mockMvc.perform(get("/api/auth/me"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                {
                    "id": "1",
                    "username": "user1",
                    "role": "ADMIN"
                }
            """));
    }

    @Test
    @DirtiesContext
    void registerTest_whenUsernameIsNew_thenUserIsCreated() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(post("/api/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "username": "user1",
                    "password": "password123",
                    "role": "ADMIN"
                }
            """))
            // THEN
            .andExpect(status().isCreated())
            .andExpect(content().json("""
                {
                    "username": "user1",
                    "role": "ADMIN"
                }
            """))
            .andExpect(jsonPath("$.id").exists());
    }

    @Test
    @DirtiesContext
    void registerTest_whenUsernameAlreadyExists_thenThrow() throws Exception {
        // GIVEN
        userRepository.save(new AppUser("1", "user1", "password123", AppUserRole.ADMIN));

        // WHEN
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "username": "user1",
                        "password": "pass123",
                        "role": "USER"
                    }
                """))
                // THEN
                .andExpect(status().isConflict())
                .andExpect(content().json("""
                    {
                        "status": 409,
                        "message": "User with username user1 already exists."
                    }
                """))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @WithMockUser(username = "user1")
    void logoutShouldInvalidateSessionAndClearContext() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(post("/logout"))
            // THEN
            .andExpect(status().isNoContent());

        SecurityContext securityContext = SecurityContextHolder.getContext();
        assertNull(securityContext.getAuthentication());
    }
}