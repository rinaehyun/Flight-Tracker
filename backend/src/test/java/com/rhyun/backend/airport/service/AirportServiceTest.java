package com.rhyun.backend.airport.service;

import com.rhyun.backend.airport.dto.GetAirportDto;
import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.model.AirportAddress;
import com.rhyun.backend.airport.model.AirportTimeZone;
import com.rhyun.backend.airport.model.GeoCode;
import com.rhyun.backend.airport.repository.AirportRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AirportServiceTest {

    private final AirportRepository airportRepository = mock(AirportRepository.class);
    private final AirportService airportService = new AirportService(airportRepository);

    Airport airport1 = new Airport("123", "GDANSK", "GDN", new GeoCode(54, 18),
            new AirportAddress("POLAND"), new AirportTimeZone("+02:00"));
    Airport airport2 = new Airport("456", "GOTEBORG", "GOT", new GeoCode(57, 12),
            new AirportAddress("SWEDEN"), new AirportTimeZone("+02:00"));

    @Test
    void getAllAirportsTest_whenDBIsEmpty_thenReturnEmptyList() {
        // GIVEN
        List<Airport> airports = new ArrayList<>();
        when(airportRepository.findAll()).thenReturn(airports);

        // WHEN
        List<Airport> actual = airportService.getAllAirports();

        // THEN
        verify(airportRepository, times(1)).findAll();
        assertThat(actual).isEmpty();
    }

    @Test
    void getAllAirportsTest_whenDBHasData_thenReturnListOfAirports() {
        // GIVEN
        List<Airport> airports = List.of(airport1, airport2);
        when(airportRepository.findAll()).thenReturn(airports);

        // WHEN
        List<Airport> actual = airportService.getAllAirports();

        // THEN
        List<Airport> expected = List.of(airport1, airport2);

        assertEquals(expected, actual);
        verify(airportRepository, times(1)).findAll();
    }

    @Test
    void getAirportOptionsTest_whenDBIsEmpty_thenReturnEmptyList () {
        // GIVEN
        List<Airport> airports = new ArrayList<>();
        when(airportRepository.findAll()).thenReturn(airports);

        // WHEN
        List<GetAirportDto> actual = airportService.getAirportOptions();

        // THEN
        assertThat(actual).isEmpty();
        verify(airportRepository, times(1)).findAll();
    }

    @Test
    void getAirportOptionsTest_whenDBHasData_thenReturnListOfAirports () {
        // GIVEN
        List<Airport> airports = List.of(airport1, airport2);
        when(airportRepository.findAll()).thenReturn(airports);

        // WHEN
        List<GetAirportDto> actual = airportService.getAirportOptions();

        // THEN
        GetAirportDto airportDto1 = new GetAirportDto("GDN", "Gdansk, Poland");
        GetAirportDto airportDto2 = new GetAirportDto("GOT", "Goteborg, Sweden");
        List<GetAirportDto> expected = List.of(airportDto1, airportDto2);

        assertEquals(expected, actual);
        verify(airportRepository, times(1)).findAll();
    }
}