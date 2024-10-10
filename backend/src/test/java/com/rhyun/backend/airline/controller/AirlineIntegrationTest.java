package com.rhyun.backend.airline.controller;

import com.rhyun.backend.airline.model.Airline;
import com.rhyun.backend.airline.repository.AirlineRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AirlineIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private AirlineRepository airlineRepository;

    Airline airline1 = new Airline("1", "SQ", "SINGAPORE AIRLINES", "SINGAPORE");
    Airline airline2 = new Airline("2", "KE", "KOREAN AIR", "KOREAN AIR");

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
                        "iataCode": "SQ",
                        "businessName": "SINGAPORE AIRLINES",
                        "commonName": "SINGAPORE"
                    },
                    {
                        "id": "2",
                        "iataCode": "KE",
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

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void getAirlineByIataCodeTest_whenIataCodeExists_thenReturnAirlineEntity() throws Exception {
        // GIVEN
        airlineRepository.save(airline1);

        // WHEN
        mockMvc.perform(get("/api/airline/iata/SQ"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                {
                    "iataCode": "SQ",
                    "businessName": "SINGAPORE AIRLINES",
                    "commonName": "SINGAPORE"
                }
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void getAirlineByIataCodeTest_whenIataCodeDoesNotExist_thenThrow() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(get("/api/airline/iata/SQ"))
            // THEN
            .andExpect(status().isNotFound())
            .andExpect(content().json("""
                {
                    "status": 404,
                    "message": "Airline with IATA Code SQ cannot be found."
                }
            """))
            .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void createAirlineTest_whenIataCodeIsNew_thenAirlineEntityIsCreated() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(post("/api/airline")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "iataCode": "SQ",
                        "businessName": "Singapore Airlines",
                        "commonName": "Singapore Air"
                    }
                """))
            // THEN
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.iataCode").value("SQ"))
            .andExpect(jsonPath("$.businessName").value("Singapore Airlines"))
            .andExpect(jsonPath("$.commonName").value("Singapore Air"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void createAirlineTest_whenIataCodeAlreadyExists_thenThrow() throws Exception {
        // GIVEN
        airlineRepository.save(airline1);

        // WHEN
        mockMvc.perform(post("/api/airline")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "iataCode": "SQ",
                    "businessName": "Singapore Airlines",
                    "commonName": "Singapore Air"
                }
            """))
            // THEN
            .andExpect(status().isConflict())
            .andExpect(content().json("""
                {
                    "status": 409,
                    "message": "Airline with IATA Code SQ already exists."
                }
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void deleteAirlineTest_whenIdExists_thenDeleteAirlineEntity() throws Exception {
        // GIVEN
        airlineRepository.save(airline1);

        mockMvc.perform(get("/api/airline"))
            .andExpect(status().isOk())
            .andExpect(content().json("""
                [{
                    "id": "1",
                    "iataCode": "SQ",
                    "businessName": "SINGAPORE AIRLINES",
                    "commonName": "SINGAPORE"
                }]
            """));

        // WHEN
        mockMvc.perform(delete("/api/airline/1"))
            // THEN
            .andExpect(status().isOk());

        mockMvc.perform(get("/api/airline"))
            .andExpect(status().isOk())
            .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void updateAirlineTest_whenIdExists_thenReturnAirlineEntity() throws Exception {
        // GIVEN
        airlineRepository.save(airline1);

        // WHEN
        mockMvc.perform(put("/api/airline/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "iataCode": "SQ",
                    "businessName": "SINGAPORE AIRWAYS",
                    "commonName": "SINGAPORE AIRWAYS"
                }
            """))
            // WHEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                {
                    "iataCode": "SQ",
                    "businessName": "SINGAPORE AIRWAYS",
                    "commonName": "SINGAPORE AIRWAYS"
                }
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = {"ROLE_ADMIN", "ROLE_EMPLOYEE"})
    void updateAirlineTest_whenIdDoesNotExist_thenThrow() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(put("/api/airline/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "iataCode": "SQ",
                    "businessName": "SINGAPORE AIRWAYS",
                    "commonName": "SINGAPORE AIRWAYS"
                }
            """))
            // WHEN
            .andExpect(status().isNotFound())
            .andExpect(content().json("""
                {
                    "status": 404,
                    "message": "Airline with id 1 cannot be found."
                }
            """))
            .andExpect(jsonPath("$.timestamp").exists());
    }
}