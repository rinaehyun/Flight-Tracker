package com.rhyun.backend.security.controller;

import com.rhyun.backend.security.model.AppUser;
import com.rhyun.backend.security.model.AppUserRole;
import com.rhyun.backend.security.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    UserRepository userRepository;

    @Test
    @DirtiesContext
    void getUserByIdTest_whenIdExists_thenReturnUserEntity() throws Exception {
        // GIVEN
        userRepository.save(new AppUser("1", "user1", "pass123", AppUserRole.ADMIN));

        // WHEN
        mockMvc.perform(get("/api/user/1"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                {
                    "username": "user1",
                    "password": "pass123",
                    "role": "ADMIN"
                }
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void getUserByIdTest_whenIdDoesNotExist_thenThrow() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(get("/api/user/1"))
            // THEN
            .andExpect(status().isNotFound())
            .andExpect(content().json("""
                {
                    "status": 404,
                    "message": "User with id 1 cannot be found."
                }
            """))
            .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void updateUserTest_whenIdDoesNotExist_thenThrows() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(put("/api/user/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "password": "password",
                    "role": "EMPLOYEE"
                }
            """))
            // THEN
            .andExpect(status().isNotFound())
            .andExpect(content().json("""
                {
                    "status": 404,
                    "message": "User with id 1 cannot be found."
                }
            """));
    }
}