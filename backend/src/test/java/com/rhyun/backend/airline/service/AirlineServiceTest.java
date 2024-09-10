package com.rhyun.backend.airline.service;

import com.rhyun.backend.airline.dto.GetAirlineDto;
import com.rhyun.backend.airline.model.Airline;
import com.rhyun.backend.airline.repository.AirlineRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AirlineServiceTest {

    private final AirlineRepository airlineRepository = mock(AirlineRepository.class);
    private final AirlineService airlineService = new AirlineService(airlineRepository);

    Airline airline1 = new Airline("1", "airline", "SQ", "SIA",
            "SINGAPORE AIRLINES", "SINGAPORE");
    Airline airline2 = new Airline("2", "airline", "KE", "KAL",
            "KOREAN AIR", "KOREAN AIR");

    @Test
    void getAllAirlinesTest_whenDBIsEmpty_thenReturnEmptyList() {
        // GIVEN
        List<Airline> airlines = new ArrayList<>();
        when(airlineRepository.findAll()).thenReturn(airlines);

        // WHEN
        List<Airline> actual = airlineService.getAllAirlines();

        // THEN
        assertThat(actual).isEmpty();
        verify(airlineRepository, times(1)).findAll();
    }

    @Test
    void getAllAirlinesTest_whenDBHasData_thenReturnListOfAirlines() {
        // GIVEN
        List<Airline> airlines = List.of(airline1, airline2);
        when(airlineRepository.findAll()).thenReturn(airlines);

        // WHEN
        List<Airline> actual = airlineService.getAllAirlines();

        // THEN
        List<Airline> expected = List.of(airline1, airline2);
        assertEquals(expected, actual);
        verify(airlineRepository, times(1)).findAll();
    }

    @Test
    void getAirlineOptionsTest_whenDBIsEmpty_thenReturnEmptyList() {
        // GIVEN
        List<Airline> airlines = new ArrayList<>();
        when(airlineRepository.findAll()).thenReturn(airlines);

        // WHEN
        List<GetAirlineDto> actual = airlineService.getAirlineOptions();

        // THEN
        assertThat(actual).isEmpty();
        verify(airlineRepository, times(1)).findAll();
    }

    @Test
    void getAirlineOptionsTest_whenDBHasData_thenReturnListOfAirlines() {
        // GIVEN
        List<Airline> airlines = List.of(airline1, airline2);
        when(airlineRepository.findAll()).thenReturn(airlines);

        // WHEN
        List<GetAirlineDto> actual = airlineService.getAirlineOptions();

        // THEN
        GetAirlineDto airlineDto1 = new GetAirlineDto("SQ", "Singapore Airlines");
        GetAirlineDto airlineDto2 = new GetAirlineDto("KE", "Korean Air");
        List<GetAirlineDto> expected = List.of(airlineDto1, airlineDto2);

        assertEquals(expected, actual);
        verify(airlineRepository, times(1)).findAll();
    }
}