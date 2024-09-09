package com.rhyun.backend.airport.service;

import com.rhyun.backend.airport.dto.AirportDto;
import com.rhyun.backend.airport.dto.GetAirportDto;
import com.rhyun.backend.airport.exception.AirportNotFoundException;
import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.model.AirportAddress;
import com.rhyun.backend.airport.model.AirportTimeZone;
import com.rhyun.backend.airport.model.GeoCode;
import com.rhyun.backend.airport.repository.AirportRepository;
import com.rhyun.backend.globalservice.IdService;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AirportServiceTest {

    private final AirportRepository airportRepository = mock(AirportRepository.class);
    private final IdService idService = mock(IdService.class);
    private final AirportService airportService = new AirportService(airportRepository, idService);

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

    @Test
    void getAirportByIdTest_whenIdExists_thenReturnAnAirline() {
        // GIVEN
        String id = "123";
        when(airportRepository.findById(id)).thenReturn(Optional.of(airport1));

        // WHEN
        Airport actual = airportService.getAirportById(id);

        // THEN
        Airport expected = new Airport("123", "GDANSK", "GDN", new GeoCode(54, 18),
                new AirportAddress("POLAND"), new AirportTimeZone("+02:00"));

        assertEquals(expected, actual);
        verify(airportRepository, times(1)).findById(id);
    }

    @Test
    void getAirportByIdTest_whenIdDoesNotExist_thenThrow() {
        // GIVEN
        String id = "135";
        when(airportRepository.findById(id)).thenReturn(Optional.empty());

        // WHEN
        // THEN
        assertThrows(AirportNotFoundException.class, () -> airportService.getAirportById(id));
        verify(airportRepository, times(1)).findById(id);
    }

    @Test
    void deleteAirportByIdTest_whenIdExists_thenDeleteFlightEntity() {
        // GIVEN
        String id = "123";
        doNothing().when(airportRepository).deleteById(id);

        // WHEN
        // THEN
        airportService.deleteAirportById(id);
        verify(airportRepository, times(1)).deleteById(id);
    }

    @Test
    void createAirportTest_whenPayloadIsCorrect_thenReturnAirportEntity() {
        // GIVEN
        AirportDto airportDto = new AirportDto( "GDANSK", "GDN", new GeoCode(54, 18),
                new AirportAddress("POLAND"), new AirportTimeZone("+02:00"));
        Airport airportToSave = new Airport("1", airportDto.name(), airportDto.iataCode(), airportDto.geoCode(),
                airportDto.address(), airportDto.timeZone());
        when(airportRepository.save(airportToSave)).thenReturn(airportToSave);
        when(idService.randomId()).thenReturn(airportToSave.id());

        // WHEN
        Airport actual = airportService.createAirport(airportDto);

        // THEN
        Airport expected = new Airport("1", airportDto.name(), airportDto.iataCode(), airportDto.geoCode(),
                airportDto.address(), airportDto.timeZone());

        assertEquals(expected, actual);
        verify(airportRepository, times(1)).save(airportToSave);
        verify(idService, times(1)).randomId();
    }

    @Test
    void updateAirportTest_whenIdExistsAndPayloadIsCorrect_thenUpdateAirportEntity() {
        // GIVEN
        Airport original = new Airport("1", "GDANSK", "GDN", new GeoCode(54, 18),
                new AirportAddress("POLAND"), new AirportTimeZone("+02:00"));

        AirportDto updateDto = new AirportDto( "GOTEBORG", "GOT", new GeoCode(57, 12),
                new AirportAddress("SWEDEN"), new AirportTimeZone("+02:00"));

        Airport updated = new Airport("1", updateDto.name(), updateDto.iataCode(), updateDto.geoCode(),
                updateDto.address(), updateDto.timeZone());

        when(airportRepository.findById("1")).thenReturn(Optional.of(original));
        when(airportRepository.save(updated)).thenReturn(updated);

        // WHEN
        Airport actual = airportService.updateAirport("1", updateDto);

        // THEN
        assertNotNull(actual);
        assertEquals(updated, actual);
        verify(airportRepository, times(1)).findById("1");
        verify(airportRepository, times(1)).save(updated);
    }
}