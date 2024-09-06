package com.rhyun.backend.airport.controller;

import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.service.AirportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
