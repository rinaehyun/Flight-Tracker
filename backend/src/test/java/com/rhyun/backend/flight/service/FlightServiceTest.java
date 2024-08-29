package com.rhyun.backend.flight.service;

import com.rhyun.backend.flight.dto.FlightDto;
import com.rhyun.backend.flight.exception.FlightNotFountException;
import com.rhyun.backend.flight.model.Airline;
import com.rhyun.backend.flight.model.Flight;
import com.rhyun.backend.flight.model.FlightStatus;
import com.rhyun.backend.flight.repository.FlightRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
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
    void getAFlightByIdTest_whenIdExists_thenReturnFlightEntity() {
        // GIVEN
        Flight flight1 = new Flight("123", "KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED);
        when(flightRepository.findById("123")).thenReturn(Optional.of(flight1));

        // WHEN
        Flight actual = flightService.getAFlightById("123");

        // THEN
        Flight expected = new Flight("123", "KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED);

        verify(flightRepository, times(1)).findById("123");
        assertEquals(expected, actual);
    }

    @Test
    void getAFlightByIdTest_whenIdDoesNotExist_thenThrow() {
        // GIVEN
        when(flightRepository.findById("123")).thenReturn(Optional.empty());

        // WHEN

        // THEN
        assertThrows(FlightNotFountException.class, () -> flightService.getAFlightById("123"));
        verify(flightRepository, times(1)).findById("123");
    }

    @Test
    void saveAFlightTest_whenPayloadIsCorrect_thenReturnNewFlight() {
        // GIVEN
        FlightDto flightDto = new FlightDto("KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED);
        Flight flightToSave = new Flight("1", "KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED);
        when(flightRepository.save(flightToSave)).thenReturn(flightToSave);
        when(idService.randomId()).thenReturn(flightToSave.id());

        // WHEN
        Flight actual = flightService.saveAFlight(flightDto);

        // THEN
        Flight expected = new Flight("1", flightDto.flightCode(), flightDto.airline(),
                flightDto.origin(), flightDto.destination(), flightDto.aircraftType(), flightDto.flightStatus());

        verify(flightRepository, times(1)).save(flightToSave);
        verify(idService, times(1)).randomId();
        assertEquals(expected, actual);
    }

    @Test
    void deleteFlightByIdTest_whenIdExists_thenDeleteFlight() {
        // GIVEN
        doNothing().when(flightRepository).deleteById("1");
        // WHEN

        // THEN
        flightService.deleteFlightById("1");
        verify(flightRepository, times(1)).deleteById("1");

    }

    @Test
    void updateFlightByIdTest_whenIdExists_thenUpdateFlight() {
        // GIVEN
        Flight original = new Flight("123", "KE123", Airline.KE, "ICN", "LAX", "B777", FlightStatus.ARRIVED);
        FlightDto updatedDto = new FlightDto("KE123", Airline.KE, "ICN", "NYC", "A380", FlightStatus.SCHEDULED);
        Flight updated = new Flight("123", updatedDto.flightCode(), updatedDto.airline(),
                updatedDto.origin(), updatedDto.destination(), updatedDto.aircraftType(), updatedDto.flightStatus());

        when(flightRepository.findById("123")).thenReturn(Optional.of(original));
        when(flightRepository.save(updated)).thenReturn(updated);

        // WHEN
        Flight actual = flightService.updateFlightById("123", updatedDto);

        // THEN
        verify(flightRepository, times(1)).findById("123");
        verify(flightRepository, times(1)).save(updated);

        assertNotNull(actual);
        assertEquals(updated, actual);
    }

    @Test
    void updateFlightByIdTest_whenIdDoesNotExist_thenThrow() {
        // GIVEN
        FlightDto updatedDto = new FlightDto("KE123", Airline.KE, "ICN", "NYC", "A380", FlightStatus.SCHEDULED);
        Flight updated = new Flight("123", updatedDto.flightCode(), updatedDto.airline(),
                updatedDto.origin(), updatedDto.destination(), updatedDto.aircraftType(), updatedDto.flightStatus());

        when(flightRepository.findById("123")).thenReturn(Optional.empty());
        // WHEN

        // THEN
        assertThrows(FlightNotFountException.class, () -> flightService.updateFlightById("123", updatedDto));
        verify(flightRepository, times(1)).findById("123");
        verify(flightRepository, never()).save(updated);
    }
}