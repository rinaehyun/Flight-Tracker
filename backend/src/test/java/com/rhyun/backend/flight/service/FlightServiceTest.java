package com.rhyun.backend.flight.service;

import com.rhyun.backend.flight.dto.NewFlightDto;
import com.rhyun.backend.flight.model.Airline;
import com.rhyun.backend.flight.model.Flight;
import com.rhyun.backend.flight.model.FlightStatus;
import com.rhyun.backend.flight.repository.FlightRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class FlightServiceTest {

    private final FlightRepository flightRepository = mock(FlightRepository.class);
    private final IdService idService = mock(IdService.class);
    private final FlightService flightService = new FlightService(flightRepository, idService);

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
                new Flight("123", "KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED),
                new Flight("456", "KLM323", Airline.KL, "AMS", "LAX", "A380", FlightStatus.SCHEDULED)
        );
        when(flightRepository.findAll()).thenReturn(flights);

        // WHEN
        List<Flight> actual = flightService.getAllFlights();

        // THEN
        List<Flight> expected = List.of(
                new Flight("123", "KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED),
                new Flight("456", "KLM323", Airline.KL, "AMS", "LAX", "A380", FlightStatus.SCHEDULED)
        );

        verify(flightRepository, times(1)).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void saveAFlightTest_whenPayloadIsCorrect_thenReturnNewFlight() {
        // GIVEN
        NewFlightDto newFlightDto = new NewFlightDto("KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED);
        Flight flightToSave = new Flight("1", "KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED);
        when(flightRepository.save(flightToSave)).thenReturn(flightToSave);
        when(idService.randomId()).thenReturn(flightToSave.id());

        // WHEN
        Flight actual = flightService.saveAFlight(newFlightDto);

        // THEN
        Flight expected = new Flight("1", newFlightDto.flightCode(), newFlightDto.airline(),
                newFlightDto.origin(), newFlightDto.destination(), newFlightDto.aircraftType(), newFlightDto.flightStatus());

        verify(flightRepository, times(1)).save(flightToSave);
        verify(idService, times(1)).randomId();
        assertEquals(expected, actual);
    }
}