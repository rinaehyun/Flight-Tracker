package com.rhyun.backend.airline.controller;

import com.rhyun.backend.airline.model.Airline;
import com.rhyun.backend.airline.repository.AirlineRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AirlineIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private AirlineRepository airlineRepository;

    Airline airline1 = new Airline("1", "airline", "SQ", "SIA",
            "SINGAPORE AIRLINES", "SINGAPORE");
    Airline airline2 = new Airline("2", "airline", "KE", "KAL",
            "KOREAN AIR", "KOREAN AIR");

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void getAllAirlinesTest_whenDBIsEmpty_thenReturnEmptyList() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(get("/api/airline"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void getAllAirlinesTest_whenDBHasData_thenReturnListOfAirlines() throws Exception {
        // GIVEN
        airlineRepository.save(airline1);
        airlineRepository.save(airline2);

        // WHEN
        mockMvc.perform(get("/api/airline"))
            .andExpect(status().isOk())
            .andExpect(content().json("""
                    [{
                        "id": "1",
                        "type": "airline",
                        "iataCode": "SQ",
                        "icaoCode": "SIA",
                        "businessName": "SINGAPORE AIRLINES",
                        "commonName": "SINGAPORE"
                    },
                    {
                        "id": "2",
                        "type": "airline",
                        "iataCode": "KE",
                        "icaoCode": "KAL",
                        "businessName": "KOREAN AIR",
                        "commonName": "KOREAN AIR"
                    }]
                """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void getAirlineOptionsTest_whenDBIsEmpty_thenReturnEmptyList() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(get("/api/airline/options-for-input"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void getAirlineOptionsTest_whenDBHasData_thenReturnListOfAirlines() throws Exception {
        // GIVEN
        airlineRepository.save(airline1);
        airlineRepository.save(airline2);

        // WHEN
        mockMvc.perform(get("/api/airline/options-for-input"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                [
                    {
                        "code": "SQ",
                        "name": "Singapore Airlines"
                    },
                    {
                        "code": "KE",
                        "name": "Korean Air"
                    }
                ]
            """));
    }
}