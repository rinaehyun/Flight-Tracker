package com.rhyun.backend.flights.service;

import com.rhyun.backend.flights.model.Flight;
import com.rhyun.backend.flights.repository.FlightRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    private final FlightRepo flightRepo;

    public FlightService(FlightRepo flightRepo) {
        this.flightRepo = flightRepo;
    }

    public List<Flight> getAllFlights() {
        return flightRepo.findAll();
    }
}
