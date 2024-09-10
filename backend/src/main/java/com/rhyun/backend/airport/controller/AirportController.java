package com.rhyun.backend.airport.controller;

import com.rhyun.backend.airport.dto.AirportDto;
import com.rhyun.backend.airport.dto.GetAirportDto;
import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.service.AirportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/airport")
public class AirportController {

    private final AirportService airportService;

    public AirportController (AirportService airportService) {
        this.airportService = airportService;
    }

    @GetMapping
    public List<Airport> getAllAirports() {
        return airportService.getAllAirports();
    }

    @GetMapping("/options-for-input")
    public List<GetAirportDto> getAirportOptions() {
        return airportService.getAirportOptions();
    }

    @GetMapping("/{id}")
    public Airport getAirportById(@PathVariable String id) {
        return airportService.getAirportById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAirportById(@PathVariable String id) {
        airportService.deleteAirportById(id);
    }

    @PostMapping
    public Airport createAirport(@RequestBody AirportDto airportDto) {
        return airportService.createAirport(airportDto);
    }

    @PutMapping("/{id}")
    public Airport updateAirport(@PathVariable String id, @RequestBody AirportDto airportDto) {
        return airportService.updateAirport(id, airportDto);
    }
}
