package com.rhyun.backend.airline.service;

import com.rhyun.backend.airline.dto.AirlineDto;
import com.rhyun.backend.airline.dto.GetAirlineDto;
import com.rhyun.backend.airline.exception.AirlineNotFoundException;
import com.rhyun.backend.airline.model.Airline;
import com.rhyun.backend.airline.repository.AirlineRepository;
import com.rhyun.backend.globalservice.IdService;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class AirlineServiceTest {

    private final AirlineRepository airlineRepository = mock(AirlineRepository.class);
    private final IdService idService = mock(IdService.class);
    private final AirlineService airlineService = new AirlineService(airlineRepository, idService);

    Airline airline1 = new Airline("1", "SQ", "SINGAPORE AIRLINES", "SINGAPORE");
    Airline airline2 = new Airline("2", "KE", "KOREAN AIR", "KOREAN AIR");

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

    @Test
    void findAirlineByIataCodeTest_whenIataCodeExists_thenReturnAirlineEntity() {
        // GIVEN
        when(airlineRepository.findAirlineByIataCode("SQ")).thenReturn(Optional.of(airline1));

        // WHEN
        Airline actual = airlineService.findAirlineByIataCode("SQ");

        // THEN
        Airline expected = new Airline("1", "SQ", "SINGAPORE AIRLINES", "SINGAPORE");

        assertEquals(expected, actual);
        verify(airlineRepository, times(1)).findAirlineByIataCode("SQ");
    }

    @Test
    void findAirlineByIataCodeTest_whenIataCodeDoesNotExist_thenThrow() {
        // GIVEN
        when(airlineRepository.findAirlineByIataCode("SQ")).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(AirlineNotFoundException.class, () -> airlineService.findAirlineByIataCode("SQ"));
        verify(airlineRepository, times(1)).findAirlineByIataCode("SQ");
    }

    @Test
    void createAirlineTest_whenPayloadIsCorrect_thenReturnAirlineEntity() {
        // GIVEN
        AirlineDto airlineDto = new AirlineDto("KE", "KOREAN AIR", "KOREAN AIR");
        Airline airlineToSave = new Airline("1", airlineDto.iataCode(), airlineDto.businessName(), airlineDto.commonName());

        when(idService.randomId()).thenReturn("1");
        when(airlineRepository.save(airlineToSave)).thenReturn(airlineToSave);

        // WHEN
        Airline actual = airlineService.createAirline(airlineDto);

        // THEN
        Airline expected = new Airline("1", "KE", "KOREAN AIR", "KOREAN AIR");

        assertEquals(expected, actual);
        verify(idService, times(1)).randomId();
        verify(airlineRepository, times(1)).save(airlineToSave);
    }
}