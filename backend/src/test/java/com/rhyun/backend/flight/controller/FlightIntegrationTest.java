package com.rhyun.backend.flight.controller;

import com.rhyun.backend.flight.model.Airline;
import com.rhyun.backend.flight.model.Flight;
import com.rhyun.backend.flight.model.FlightStatus;
import com.rhyun.backend.flight.repository.FlightRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

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
        flightRepository.save(new Flight("123", "KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED));
        flightRepository.save(new Flight("456", "KLM323", Airline.KL, "AMS", "LAX", "A380", FlightStatus.SCHEDULED));

        // WHEN
        mockMvc.perform(get("/api/flight"))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    [
                        {
                          "id": "123",
                          "flightCode": "KE123",
                          "airline": "KE",
                          "origin": "ICN",
                          "destination": "LAX",
                          "aircraftType": "B777",
                          "flightStatus": "ARRIVED"
                        },
                        {
                          "id": "456",
                          "flightCode": "KLM323",
                          "airline": "KL",
                          "origin": "AMS",
                          "destination": "LAX",
                          "aircraftType": "A380",
                          "flightStatus": "SCHEDULED"
                        }
                    ]
                """));
    }

    @Test
    @DirtiesContext
    void saveAFlightTest_whenNewFlightExists_thenReturnNewFlight() throws Exception {
        // GIVEN

        // WHEN
        mockMvc.perform(post("/api/flight")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                     {
                                         "flightCode": "KE123",
                                         "airline": "KE",
                                         "origin": "ICN",
                                         "destination": "LAX",
                                         "aircraftType": "B777",
                                         "flightStatus": "ARRIVED"
                                     }
                                """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.flightCode").value("KE123"))
                .andExpect(jsonPath("$.airline").value("KE"))
                .andExpect(jsonPath("$.origin").value("ICN"))
                .andExpect(jsonPath("$.destination").value("LAX"))
                .andExpect(jsonPath("$.aircraftType").value("B777"))
                .andExpect(jsonPath("$.flightStatus").value("ARRIVED"));
    }
}
