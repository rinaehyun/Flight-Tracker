package com.rhyun.backend.flight.service;

import com.rhyun.backend.flight.dto.FlightDto;
import com.rhyun.backend.flight.exception.FlightNotFountException;
import com.rhyun.backend.flight.model.Flight;
import com.rhyun.backend.flight.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final IdService idService;

    public FlightService(FlightRepository flightRepository, IdService idService) {
        this.flightRepository = flightRepository;
        this.idService = idService;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight getAFlightById(String id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFountException("Flight with id " + id + " not found."));
    }

    public Flight saveAFlight(FlightDto flightDto) {
        Flight flightToSave = new Flight(
                idService.randomId(),
                flightDto.flightCode(),
                flightDto.airline(),
                flightDto.origin(),
                flightDto.destination(),
                flightDto.departureTime(),
                flightDto.arrivalTime(),
                flightDto.aircraftType(),
                flightDto.flightStatus()
        );

        return flightRepository.save(flightToSave);
    }

    public void deleteFlightById(String id) {
        flightRepository.deleteById(id);
    }

    public Flight updateFlightById(String id, FlightDto flightDto) {
        Flight flightToUpdate = flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFountException("Flight with id " + id + " not found."))
                .withFlightCode(flightDto.flightCode())
                .withAirline(flightDto.airline())
                .withOrigin(flightDto.origin())
                .withDestination(flightDto.destination())
                .withAircraftType(flightDto.aircraftType())
                .withFlightStatus(flightDto.flightStatus());

        return flightRepository.save(flightToUpdate);
    }
}
