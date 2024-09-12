package com.rhyun.backend.airport.controller;

import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.model.AirportAddress;
import com.rhyun.backend.airport.model.AirportTimeZone;
import com.rhyun.backend.airport.model.GeoCode;
import com.rhyun.backend.airport.repository.AirportRepository;
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
class AirportIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private AirportRepository airportRepository;


    Airport airport1 = new Airport("123", "GDANSK", "GDN", new GeoCode(54, 18),
            new AirportAddress("POLAND"), new AirportTimeZone("+02:00"));
    Airport airport2 = new Airport("456", "GOTEBORG", "GOT",
            new GeoCode(57, 12), new AirportAddress("SWEDEN"), new AirportTimeZone("+02:00"));


    @Test
    @DirtiesContext
    @WithMockUser
    void getAllAirportsTest_whenDBIsEmpty_thenReturnEmptyList() throws Exception {
        // GIVEN

        // WHEN
        mockMvc.perform(get("/api/airport"))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAllAirportsTest_whenDBHasData_thenReturnListOfAirports() throws Exception {
        // GIVEN
        airportRepository.save(airport1);
        airportRepository.save(airport2);

        // WHEN
        mockMvc.perform(get("/api/airport"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                [
                    {
                        "id": "123",
                        "name": "GDANSK",
                        "iataCode": "GDN",
                        "geoCode": {
                            "latitude": 54,
                            "longitude": 18
                        },
                        "address": {
                            "countryName": "POLAND"
                        },
                        "timeZone": {
                            "offSet": "+02:00"
                        }
                    },
                    {
                        "id": "456",
                        "name": "GOTEBORG",
                        "iataCode": "GOT",
                        "geoCode": {
                            "latitude": 57,
                            "longitude": 12
                        },
                        "address": {
                            "countryName": "SWEDEN"
                        },
                        "timeZone": {
                            "offSet": "+02:00"
                        }
                    }
                ]
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAirportOptionsTest_whenDBIsEmpty_thenReturnEmptyList() throws Exception {
        // GIVEN

        // WHEN
        mockMvc.perform(get("/api/airport/options-for-input"))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAirportOptionsTest_whenDBHasData_thenReturnListOfAirports() throws Exception {
        // GIVEN
        airportRepository.save(airport1);
        airportRepository.save(airport2);

        // WHEN
        mockMvc.perform(get("/api/airport/options-for-input"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                [
                    {
                        "code": "GDN",
                        "name": "Gdansk, Poland"
                    },
                    {
                        "code": "GOT",
                        "name": "Goteborg, Sweden"
                    }
                ]
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAirportByIdTest_whenIdExists_thenReturnAirportEntity() throws Exception {
        // GIVEN
        airportRepository.save(new Airport("123", "GDANSK", "GDN", new GeoCode(54, 18),
            new AirportAddress("POLAND"), new AirportTimeZone("+02:00"))
        );

        // WHEN
        mockMvc.perform(get("/api/airport/123"))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                {
                    "id": "123",
                    "name": "GDANSK",
                    "iataCode": "GDN",
                    "geoCode": {
                    "latitude": 54,
                        "longitude": 18
                    },
                    "address": {
                        "countryName": "POLAND"
                    },
                    "timeZone": {
                        "offSet": "+02:00"
                    }
                }
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getAirportByIdTest_whenIdDoesNotExist_thenThrow() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(get("/api/airport/123"))
            .andExpect(status().isNotFound())
            .andExpect(content().json("""
                {
                    "status": 404,
                    "message": "The airport with id 123 cannot be found."
                }
            """))
            .andExpect(jsonPath("$.timestamp").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteAirportByIdTest_whenIdExists_thenDeleteAirportEntity() throws Exception {
        // GIVEN
        airportRepository.save(new Airport("123", "GDANSK", "GDN", new GeoCode(54, 18),
                new AirportAddress("POLAND"), new AirportTimeZone("+02:00")));

        mockMvc.perform(get("/api/airport"))
            .andExpect(status().isOk())
            .andExpect(content().json("""
                [{
                    "id": "123",
                    "name": "GDANSK",
                    "iataCode": "GDN",
                    "geoCode": {
                        "latitude": 54,
                        "longitude": 18
                    },
                    "address": {
                        "countryName": "POLAND"
                    },
                    "timeZone": {
                        "offSet": "+02:00"
                    }
                }]
            """));

        // WHEN
        mockMvc.perform(delete("/api/airport/123"))
            // THEN
            .andExpect(status().isOk());

        mockMvc.perform(get("/api/airport"))
            .andExpect(status().isOk())
            .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createAirportTest_whenPayloadIsCorrect_thenSaveAirportEntity() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(post("/api/airport")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "name": "GDANSK",
                    "iataCode": "GDN",
                    "geoCode": {
                        "latitude": 54,
                        "longitude": 18
                    },
                    "address": {
                        "countryName": "POLAND"
                    },
                    "timeZone": {
                        "offSet": "+02:00"
                    }
                }
            """))
            // THEN
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.name").value("GDANSK"))
            .andExpect(jsonPath("$.iataCode").value("GDN"))
            .andExpect(jsonPath("$.geoCode.latitude").value(54))
            .andExpect(jsonPath("$.geoCode.longitude").value(18))
            .andExpect(jsonPath("$.address.countryName").value("POLAND"))
            .andExpect(jsonPath("$.timeZone.offSet").value("+02:00"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateAirportTest_whenIdExists_thenUpdateAirportEntity() throws Exception {
        // GIVEN
        airportRepository.save(new Airport("123", "GDANSK", "GDN", new GeoCode(54, 18),
                new AirportAddress("POLAND"), new AirportTimeZone("+02:00"))
        );

        // WHEN
        mockMvc.perform(put("/api/airport/123")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "name": "GOTEBORG",
                    "iataCode": "GOT",
                    "geoCode": {
                    "latitude": 57,
                        "longitude": 12
                    },
                    "address": {
                        "countryName": "SWEDEN"
                    },
                    "timeZone": {
                        "offSet": "+02:00"
                    }
                }
            """))
            // THEN
            .andExpect(status().isOk())
            .andExpect(content().json("""
                {
                    "id": "123",
                    "name": "GOTEBORG",
                    "iataCode": "GOT",
                    "geoCode": {
                    "latitude": 57,
                        "longitude": 12
                    },
                    "address": {
                        "countryName": "SWEDEN"
                    },
                    "timeZone": {
                        "offSet": "+02:00"
                    }
                }
            """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateAirportTest_whenIdDoesNotExist_thenThrow() throws Exception {
        // GIVEN
        // WHEN
        mockMvc.perform(put("/api/airport/123")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "name": "GOTEBORG",
                    "iataCode": "GOT",
                    "geoCode": {
                    "latitude": 57,
                        "longitude": 12
                    },
                    "address": {
                        "countryName": "SWEDEN"
                    },
                    "timeZone": {
                        "offSet": "+02:00"
                    }
                }
            """))
            // THEN
            .andExpect(status().isNotFound())
            .andExpect(content().json("""
                {
                    "status": 404,
                    "message": "The airport with id 123 cannot be found."
                }
            """));
    }
}