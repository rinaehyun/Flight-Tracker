package com.rhyun.backend.flight.controller;

import com.rhyun.backend.flight.dto.NewFlightDto;
import com.rhyun.backend.flight.model.Flight;
import com.rhyun.backend.flight.service.FlightService;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public Flight createAFlight(@RequestBody NewFlightDto newFlightDto) {
        return flightService.saveAFlight(newFlightDto);
    }

    @DeleteMapping("/{id}")
    public void removeAFlight(@PathVariable String id) {
        flightService.deleteFlightById(id);
    }
}
