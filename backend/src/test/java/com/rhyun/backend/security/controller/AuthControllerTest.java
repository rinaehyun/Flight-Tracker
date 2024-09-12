package com.rhyun.backend.security.controller;

import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.model.AirportAddress;
import com.rhyun.backend.airport.model.AirportTimeZone;
import com.rhyun.backend.airport.model.GeoCode;
import com.rhyun.backend.security.exception.UserNotFoundException;
import com.rhyun.backend.security.model.AppUser;
import com.rhyun.backend.security.repository.UserRepository;
import com.rhyun.backend.security.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        userRepository.save(new AppUser("1", "user1", "password123", "USER"));

        // WHEN
        mockMvc.perform(get("/api/auth/me"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                {
                    "id": "1",
                    "username": "user1",
                    "role": "USER"
                }
            """));
    }
}