package com.rhyun.backend.flight.controller;

import com.rhyun.backend.flight.dto.FlightDto;
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

    @GetMapping("/{id}")
    public Flight retrieveAFlight (@PathVariable String id) {
        return flightService.getAFlightById(id);
    }

    @PostMapping
    public Flight createAFlight(@RequestBody FlightDto flightDto) {
        return flightService.saveAFlight(flightDto);
    }

    @DeleteMapping("/{id}")
    public void removeAFlight(@PathVariable String id) {
        flightService.deleteFlightById(id);
    }

    @PutMapping("/{id}")
    public Flight updateAFlight(
            @PathVariable String id,
            @RequestBody FlightDto flightDto
    ) {
        return flightService.updateFlightById(id, flightDto);
    }
}
