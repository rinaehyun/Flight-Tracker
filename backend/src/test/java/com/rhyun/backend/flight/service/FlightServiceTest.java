package com.rhyun.backend.flight.service;

import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.model.AirportAddress;
import com.rhyun.backend.airport.model.AirportTimeZone;
import com.rhyun.backend.airport.model.GeoCode;
import com.rhyun.backend.airport.repository.AirportRepository;
import com.rhyun.backend.flight.dto.FlightDto;
import com.rhyun.backend.flight.exception.FlightNotFoundException;
import com.rhyun.backend.flight.model.Airline;
import com.rhyun.backend.flight.model.Flight;
import com.rhyun.backend.flight.model.FlightStatus;
import com.rhyun.backend.flight.repository.FlightRepository;
import com.rhyun.backend.globalservice.IdService;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FlightServiceTest {

    private final FlightRepository flightRepository = mock(FlightRepository.class);
    private final IdService idService = mock(IdService.class);
    private final AirportRepository airportRepository = mock(AirportRepository.class);
    private final FlightService flightService = new FlightService(flightRepository, idService, airportRepository);

    private final LocalDateTime localDateTimeOrigin = LocalDateTime.parse("2023-01-23T15:30:00");
    private final LocalDateTime localDateTimeDestination = LocalDateTime.parse("2023-01-24T15:15:00");

    Duration duration1 = Duration.parse("PT10H30M");
    Duration duration2 = Duration.parse("PT15H30M");

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
                new Flight("123", "KE123", Airline.KE, "ICN", "LAX",
                        localDateTimeOrigin, localDateTimeDestination, "B777", FlightStatus.ARRIVED, duration1),
                new Flight("456", "KLM323", Airline.KL, "AMS", "LAX",
                        localDateTimeOrigin, localDateTimeDestination, "A380", FlightStatus.SCHEDULED, duration2)
        );
        when(flightRepository.findAll()).thenReturn(flights);

        // WHEN
        List<Flight> actual = flightService.getAllFlights();

        // THEN
        List<Flight> expected = List.of(
                new Flight("123", "KE123", Airline.KE, "ICN", "LAX",
                        localDateTimeOrigin, localDateTimeDestination, "B777", FlightStatus.ARRIVED, duration1),
                new Flight("456", "KLM323", Airline.KL, "AMS", "LAX",
                        localDateTimeOrigin, localDateTimeDestination, "A380", FlightStatus.SCHEDULED, duration2)
        );

        verify(flightRepository, times(1)).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getAFlightByIdTest_whenIdExists_thenReturnFlightEntity() {
        // GIVEN
        Flight flight1 = new Flight("123", "KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination, "B777", FlightStatus.ARRIVED, duration1);
        when(flightRepository.findById("123")).thenReturn(Optional.of(flight1));

        // WHEN
        Flight actual = flightService.getAFlightById("123");

        // THEN
        Flight expected = new Flight("123", "KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination, "B777", FlightStatus.ARRIVED, duration1);

        verify(flightRepository, times(1)).findById("123");
        assertEquals(expected, actual);
    }

    @Test
    void getAFlightByIdTest_whenIdDoesNotExist_thenThrow() {
        // GIVEN
        when(flightRepository.findById("123")).thenReturn(Optional.empty());

        // WHEN

        // THEN
        assertThrows(FlightNotFoundException.class, () -> flightService.getAFlightById("123"));
        verify(flightRepository, times(1)).findById("123");
    }

    @Test
    void calculateFlightDurationTest() {
        // GIVEN
        Airport originAirport = new Airport("a123", "INCHEON", "ICN", new GeoCode(54, 18),
                new AirportAddress("KOREA", "KR", "ASIA"), new AirportTimeZone("+09:00"));
        Airport destinationAirport = new Airport("a456", "LOS ANGELES", "LAX", new GeoCode(32, 126),
                new AirportAddress("UNITED STATES OF AMERICA", "US", "NAMER"), new AirportTimeZone("-07:00"));

        when(airportRepository.getAirportByIataCode("ICN")).thenReturn(originAirport);
        when(airportRepository.getAirportByIataCode("LAX")).thenReturn(destinationAirport);

        FlightDto flightDto = new FlightDto("KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination, "B777", FlightStatus.ARRIVED);

        // WHEN
        Duration actual = flightService.calculateFlightDuration(flightDto);

        // THEN
        Duration expected = Duration.parse("PT39H45M");

        verify(airportRepository, times(1)).getAirportByIataCode("ICN");
        verify(airportRepository, times(1)).getAirportByIataCode("LAX");
        assertEquals(expected, actual);
    }

    @Test
    void saveAFlightTest_whenPayloadIsCorrect_thenReturnNewFlight() {
        // GIVEN
        Airport originAirport = new Airport("a123", "INCHEON", "ICN", new GeoCode(54, 18),
                new AirportAddress("KOREA", "KR", "ASIA"), new AirportTimeZone("+09:00"));
        Airport destinationAirport = new Airport("a456", "LOS ANGELES", "LAX", new GeoCode(32, 126),
                new AirportAddress("UNITED STATES OF AMERICA", "US", "NAMER"), new AirportTimeZone("-07:00"));

        when(airportRepository.getAirportByIataCode("ICN")).thenReturn(originAirport);
        when(airportRepository.getAirportByIataCode("LAX")).thenReturn(destinationAirport);

        FlightDto flightDto = new FlightDto("KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination, "B777", FlightStatus.ARRIVED);
        Flight flightToSave = new Flight("1", "KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination, "B777", FlightStatus.ARRIVED, Duration.parse("PT39H45M"));

        when(flightRepository.save(flightToSave)).thenReturn(flightToSave);
        when(idService.randomId()).thenReturn(flightToSave.id());

        // WHEN
        Flight actual = flightService.saveAFlight(flightDto);

        // THEN
        Flight expected = new Flight("1", flightDto.flightCode(), flightDto.airline(),
                flightDto.origin(), flightDto.destination(), flightDto.departureTime(), flightDto.arrivalTime(),
                flightDto.aircraftType(), flightDto.flightStatus(), Duration.parse("PT39H45M"));

        verify(airportRepository, times(1)).getAirportByIataCode("ICN");
        verify(airportRepository, times(1)).getAirportByIataCode("LAX");
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
        Airport originAirport = new Airport("a123", "INCHEON", "ICN", new GeoCode(54, 18),
                new AirportAddress("KOREA", "KR", "ASIA"), new AirportTimeZone("+09:00"));
        Airport destinationAirport = new Airport("a456", "LOS ANGELES", "LAX", new GeoCode(32, 126),
                new AirportAddress("UNITED STATES OF AMERICA", "US", "NAMER"), new AirportTimeZone("-07:00"));

        when(airportRepository.getAirportByIataCode("ICN")).thenReturn(originAirport);
        when(airportRepository.getAirportByIataCode("LAX")).thenReturn(destinationAirport);

        Flight original = new Flight("123", "KE123", Airline.KE, "ICN", "LAX",
                localDateTimeOrigin, localDateTimeDestination, "B777", FlightStatus.ARRIVED, duration1);
        FlightDto updatedDto = new FlightDto("KE123", Airline.KE, "LAX", "ICN",
                localDateTimeOrigin, localDateTimeDestination, "A380", FlightStatus.SCHEDULED);

        Flight updated = new Flight("123", updatedDto.flightCode(), updatedDto.airline(),
                updatedDto.origin(), updatedDto.destination(), updatedDto.departureTime(), updatedDto.arrivalTime(),
                updatedDto.aircraftType(), updatedDto.flightStatus(), Duration.parse("PT7H45M"));

        when(flightRepository.findById("123")).thenReturn(Optional.of(original));
        when(flightRepository.save(updated)).thenReturn(updated);

        // WHEN
        Flight actual = flightService.updateFlightById("123", updatedDto);

        // THEN
        verify(airportRepository, times(1)).getAirportByIataCode("ICN");
        verify(airportRepository, times(1)).getAirportByIataCode("LAX");
        verify(flightRepository, times(1)).findById("123");
        verify(flightRepository, times(1)).save(updated);

        assertNotNull(actual);
        assertEquals(updated, actual);
    }

    @Test
    void updateFlightByIdTest_whenIdDoesNotExist_thenThrow() {
        // GIVEN
        FlightDto updatedDto = new FlightDto("KE123", Airline.KE, "ICN", "NYC",
                localDateTimeOrigin, localDateTimeDestination, "A380", FlightStatus.SCHEDULED);
        Flight updated = new Flight("123", updatedDto.flightCode(), updatedDto.airline(),
                updatedDto.origin(), updatedDto.destination(), updatedDto.departureTime(), updatedDto.arrivalTime(),
                updatedDto.aircraftType(), updatedDto.flightStatus(), duration2);

        when(flightRepository.findById("123")).thenReturn(Optional.empty());
        // WHEN

        // THEN
        assertThrows(FlightNotFoundException.class, () -> flightService.updateFlightById("123", updatedDto));
        verify(flightRepository, times(1)).findById("123");
        verify(flightRepository, never()).save(updated);
    }
}