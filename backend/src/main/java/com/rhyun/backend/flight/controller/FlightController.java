package com.rhyun.backend.flight.controller;

import com.rhyun.backend.flight.model.Flight;
import com.rhyun.backend.flight.service.FlightService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/flight")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public List<Flight> retrieveAllFlights() {
        return flightService.getAllFlights();
    }
}
