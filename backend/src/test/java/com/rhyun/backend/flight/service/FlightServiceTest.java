package com.rhyun.backend.flight.service;

import com.rhyun.backend.flight.model.Flight;
import com.rhyun.backend.flight.repository.FlightRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class FlightServiceTest {

    private final FlightRepository flightRepository = mock(FlightRepository.class);
    private final FlightService flightService = new FlightService(flightRepository);

    @Test
    void getAllFlightsTest_whenDBIsEmpty_thenReturnEmptyList() {
        // GIVEN
        List<Flight> flights = new ArrayList<>();
        when(flightRepository.findAll()).thenReturn(flights);

        // WHEN
        List<Flight> actual = flightService.getAllFlights();

        // THEN
        verify(flightRepository, times(1)).findAll();
        assertThat(actual).isEmpty();
    }

    @Test
    void getAllFlightsTest_whenDBHasData_thenReturnListOfFlights() {
        // GIVEN
        List<Flight> flights = List.of(
                new Flight("123", "KE123", "KAL"),
                new Flight("456", "KLM323", "KLM")
        );
        when(flightRepository.findAll()).thenReturn(flights);

        // WHEN
        List<Flight> actual = flightService.getAllFlights();

        // THEN
        List<Flight> expected = List.of(
                new Flight("123", "KE123", "KAL"),
                new Flight("456", "KLM323", "KLM")
        );

        verify(flightRepository, times(1)).findAll();
        assertEquals(expected, actual);
    }
}