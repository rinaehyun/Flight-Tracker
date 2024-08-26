package com.rhyun.backend.flights.controller;

import com.rhyun.backend.flights.model.Flight;
import com.rhyun.backend.flights.repository.FlightRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class FlightIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FlightRepository flightRepository;

    @BeforeEach
    void setUp() {
        // Ensure the database is empty before each test
        flightRepository.deleteAll();
    }

    @Test
    void retrieveAllFlightsTest_whenDBIsEmpty_thenReturnEmptyList() throws Exception {
        // GIVEN

        // WHEN
        mockMvc.perform(get("/api/flight"))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void retrieveAllFlightsTest_whenRepoHasData_thenReturnMovieList() throws Exception {
        // GIVEN
        flightRepository.save(new Flight("123", "KE123", "KAL"));
        flightRepository.save(new Flight("456", "KLM323", "KLM"));

        // WHEN
        mockMvc.perform(get("/api/flight"))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    [
                        {
                          "id": "123",
                          "airlineCode": "KE123",
                          "airlineICAO": "KAL"
                        },
                        {
                          "id": "456",
                          "airlineCode": "KLM323",
                          "airlineICAO": "KLM"
                        }
                    ]
                """));
    }
}
