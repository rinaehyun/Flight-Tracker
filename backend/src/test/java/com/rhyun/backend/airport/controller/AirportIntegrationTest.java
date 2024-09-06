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
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AirportIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private AirportRepository airportRepository;

    @Test
    void getAllAirportsTest_whenDBIsEmpty_thenReturnEmptyList() throws Exception {
        // GIVEN

        // WHEN
        mockMvc.perform(get("/api/airport"))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void getAllAirportsTest_whenDBHasData_thenReturnListOfAirports() throws Exception {
        // GIVEN
        Airport airport1 = new Airport("123", "GDANSK", "GDN", new GeoCode(54, 18),
                new AirportAddress("POLAND"), new AirportTimeZone("+02:00"));
        Airport airport2 = new Airport("456", "GOTEBORG", "GOT",
                new GeoCode(57, 12), new AirportAddress("SWEDEN"), new AirportTimeZone("+02:00"));

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
}