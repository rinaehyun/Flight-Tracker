package com.rhyun.backend.flight.controller;

import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.model.AirportAddress;
import com.rhyun.backend.airport.model.AirportTimeZone;
import com.rhyun.backend.airport.model.GeoCode;
import com.rhyun.backend.airport.repository.AirportRepository;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Duration;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class FlightIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private AirportRepository airportRepository;

    private final LocalDateTime localDateTimeOrigin = LocalDateTime.parse("2023-01-23T15:30:00");
    private final LocalDateTime localDateTimeDestination = LocalDateTime.parse("2023-01-24T01:15:00");

    Duration duration1 = Duration.parse("PT10H30M");
    Duration duration2 = Duration.parse("PT15H30M");

    @BeforeEach
    void setUp() {
        // Ensure the database is empty before each test
        flightRepository.deleteAll();
    }

    @Test
    @WithMockUser
    void retrieveAllFlightsTest_whenDBIsEmpty_thenReturnEmptyList() throws Exception {
        // GIVEN

        // WHEN
        mockMvc.perform(get("/api/flight"))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @WithMockUser
    void retrieveAllFlightsTest_whenRepoHasData_thenReturnMovieList() throws Exception {
        // GIVEN
        flightRepository.save(new Flight("123", "KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination,"B777", FlightStatus.ARRIVED, duration1));
        flightRepository.save(new Flight("456", "KLM323", Airline.KL, "AMS", "LAX",
                localDateTimeOrigin, localDateTimeDestination,"A380", FlightStatus.SCHEDULED, duration2));

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
                        "departureTime": "2023-01-23T15:30:00",
                        "arrivalTime": "2023-01-24T01:15:00",
                        "aircraftType": "B777",
                        "flightStatus": "ARRIVED",
                        "duration": "PT10H30M"
                    },
                    {
                        "id": "456",
                        "flightCode": "KLM323",
                        "airline": "KL",
                        "origin": "AMS",
                        "destination": "LAX",
                        "departureTime": "2023-01-23T15:30:00",
                        "arrivalTime": "2023-01-24T01:15:00",
                        "aircraftType": "A380",
                        "flightStatus": "SCHEDULED",
                        "duration": "PT15H30M"
                    }
                ]
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void retrieveAFlightTest_whenIdExists_thenReturnFlightEntity() throws Exception {
        // GIVEN
        flightRepository.save(new Flight("123", "KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination,"B777", FlightStatus.ARRIVED, duration1));

        // WHEN
        mockMvc.perform(get("/api/flight/123"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                {
                    "id": "123",
                    "flightCode": "KE123",
                    "airline": "KE",
                    "origin": "ICN",
                    "destination": "LAX",
                    "departureTime": "2023-01-23T15:30:00",
                    "arrivalTime": "2023-01-24T01:15:00",
                    "aircraftType": "B777",
                    "flightStatus": "ARRIVED",
                    "duration": "PT10H30M"
                }
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void retrieveAFlightTest_whenIdDoesNotExist_thenThrow() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(get("/api/flight/123"))
                // THEN
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                    {
                        "status": 404,
                        "message": "Flight with id 123 not found."
                    }
                 """))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void createAFlightTest_whenNewFlightExists_thenReturnNewFlight() throws Exception {
        // GIVEN
        airportRepository.save(new Airport("a123", "INCHEON", "ICN", new GeoCode(54, 18),
                new AirportAddress("KOREA", "KR", "ASIA"), new AirportTimeZone("+09:00")));
        airportRepository.save(new Airport("a456", "LOS ANGELES", "LAX", new GeoCode(32, 126),
                new AirportAddress("UNITED STATES OF AMERICA", "US", "NAMER"), new AirportTimeZone("-07:00")));

        // WHEN
        mockMvc.perform(post("/api/flight")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                         {
                             "flightCode": "KE123",
                             "airline": "KE",
                             "origin": "ICN",
                             "destination": "LAX",
                             "departureTime": "2023-01-23T15:30:00",
                             "arrivalTime": "2023-01-24T01:15:00",
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
            .andExpect(jsonPath("$.departureTime").value("2023-01-23T15:30:00"))
            .andExpect(jsonPath("$.arrivalTime").value("2023-01-24T01:15:00"))
            .andExpect(jsonPath("$.aircraftType").value("B777"))
            .andExpect(jsonPath("$.flightStatus").value("ARRIVED"))
            .andExpect(jsonPath("$.duration").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void removeAFlightTest_whenIdExists_thenDeleteFlight() throws Exception {
        // GIVEN
        flightRepository.save(new Flight("1", "KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination,"B777", FlightStatus.ARRIVED, duration1));

        mockMvc.perform(get("/api/flight"))
            .andExpect(status().isOk())
            .andExpect(content().json("""
                [{
                    "id": "1",
                    "flightCode": "KE123",
                    "airline": "KE",
                    "origin": "ICN",
                    "destination": "LAX",
                    "departureTime": "2023-01-23T15:30:00",
                    "arrivalTime": "2023-01-24T01:15:00",
                    "aircraftType": "B777",
                    "flightStatus": "ARRIVED",
                    "duration": "PT10H30M"
                }]
            """));

        // WHEN
        mockMvc.perform(delete("/api/flight/1"))
                // THEN
                .andDo(print())
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/flight"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void updateAFlightTest_whenIdExists_thenUpdateFlight() throws Exception {
        // GIVEN
        airportRepository.save(new Airport("a123", "INCHEON", "ICN", new GeoCode(54, 18),
                new AirportAddress("KOREA", "KR", "ASIA"), new AirportTimeZone("+09:00")));
        airportRepository.save(new Airport("a456", "LOS ANGELES", "LAX", new GeoCode(32, 126),
                new AirportAddress("UNITED STATES OF AMERICA", "US", "NAMER"), new AirportTimeZone("-07:00")));

        flightRepository.save(new Flight("1", "KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination,"B777", FlightStatus.ARRIVED, duration1));

        // WHEN
        mockMvc.perform(put("/api/flight/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                 {
                     "flightCode": "KE345",
                     "airline": "KE",
                     "origin": "ICN",
                     "destination": "LAX",
                     "departureTime": "2023-01-23T15:30:00",
                     "arrivalTime": "2023-01-24T01:15:00",
                     "aircraftType": "A350",
                     "flightStatus": "DELAYED"
                 }
            """))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                 {
                     "id": "1",
                     "flightCode": "KE345",
                     "airline": "KE",
                     "origin": "ICN",
                     "destination": "LAX",
                     "departureTime": "2023-01-23T15:30:00",
                     "arrivalTime": "2023-01-24T01:15:00",
                     "aircraftType": "A350",
                     "flightStatus": "DELAYED"
                 }
             """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void updateAFlightTest_whenIdDoesNotExist_thenThrow() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(put("/api/flight/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                 {
                     "flightCode": "LH123",
                     "airline": "LH",
                     "origin": "FRA",
                     "destination": "HAM",
                     "departureTime": "2023-01-23T15:30:00",
                     "arrivalTime": "2023-01-24T01:15:00",
                     "aircraftType": "A350",
                     "flightStatus": "DELAYED"
                 }
            """))
            // THEN
            .andExpect(status().isNotFound())
            .andExpect(content().json("""
                {
                    "status": 404,
                    "message": "Flight with id 1 not found."
                }
             """))
            .andExpect(jsonPath("$.timestamp").exists());
    }
}
