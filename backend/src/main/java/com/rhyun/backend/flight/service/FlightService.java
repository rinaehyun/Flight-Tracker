package com.rhyun.backend.flight.service;

import com.rhyun.backend.flight.dto.NewFlightDto;
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

    public Flight saveAFlight(NewFlightDto newFlightDto) {
        Flight flightToSave = new Flight(
                idService.randomId(),
                newFlightDto.flightCode(),
                newFlightDto.airline(),
                newFlightDto.origin(),
                newFlightDto.destination(),
                newFlightDto.aircraftType(),
                newFlightDto.flightStatus()
        );

        return flightRepository.save(flightToSave);
    }

    public void deleteFlightById(String id) {
        flightRepository.deleteById(id);
    }
}
