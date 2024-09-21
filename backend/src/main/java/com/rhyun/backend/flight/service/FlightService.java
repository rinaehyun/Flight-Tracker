package com.rhyun.backend.flight.service;

import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.repository.AirportRepository;
import com.rhyun.backend.flight.dto.FlightDto;
import com.rhyun.backend.flight.exception.FlightNotFoundException;
import com.rhyun.backend.flight.model.Flight;
import com.rhyun.backend.flight.repository.FlightRepository;
import com.rhyun.backend.globalservice.IdService;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final IdService idService;
    private final AirportRepository airportRepository;

    public FlightService(FlightRepository flightRepository, IdService idService, AirportRepository airportRepository) {
        this.flightRepository = flightRepository;
        this.idService = idService;
        this.airportRepository = airportRepository;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight getAFlightById(String id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFoundException("Flight with id " + id + " not found."));
    }

    public Duration calculateFlightDuration(FlightDto flightDto) {
        Airport originAirport = airportRepository.getAirportByIataCode(flightDto.origin());
        Airport destinationAirport = airportRepository.getAirportByIataCode(flightDto.destination());

        ZoneOffset originOffset = ZoneOffset.of(originAirport.timeZone().offSet());
        ZoneOffset destinationOffset = ZoneOffset.of(destinationAirport.timeZone().offSet());

        ZonedDateTime departureTime = ZonedDateTime.of(flightDto.departureTime(), originOffset);
        ZonedDateTime arrivalTime = ZonedDateTime.of(flightDto.arrivalTime(), destinationOffset);

        return Duration.between(departureTime, arrivalTime);
    }

    public Flight saveAFlight(FlightDto flightDto) {

        Duration flightDuration = calculateFlightDuration(flightDto);

        Flight flightToSave = new Flight(
                idService.randomId(),
                flightDto.flightCode(),
                flightDto.airline(),
                flightDto.origin(),
                flightDto.destination(),
                flightDto.departureTime(),
                flightDto.arrivalTime(),
                flightDto.aircraftType(),
                flightDto.flightStatus(),
                flightDuration
        );

        return flightRepository.save(flightToSave);
    }

    public void deleteFlightById(String id) {
        flightRepository.deleteById(id);
    }

    public Flight updateFlightById(String id, FlightDto flightDto) {
        Flight flightToUpdate = flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFoundException("Flight with id " + id + " not found."))
                .withFlightCode(flightDto.flightCode())
                .withAirline(flightDto.airline())
                .withOrigin(flightDto.origin())
                .withDestination(flightDto.destination())
                .withDepartureTime(flightDto.departureTime())
                .withArrivalTime(flightDto.arrivalTime())
                .withAircraftType(flightDto.aircraftType())
                .withFlightStatus(flightDto.flightStatus())
                .withDuration(calculateFlightDuration(flightDto));

        return flightRepository.save(flightToUpdate);
    }
}
