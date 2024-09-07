package com.rhyun.backend.airline.controller;

import com.rhyun.backend.airline.model.Airline;
import com.rhyun.backend.airline.service.AirlineService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/airline")
public class AirlineController {

    private final AirlineService airlineService;

    public AirlineController(AirlineService airlineService) {
        this.airlineService = airlineService;
    }

    @GetMapping()
    public List<Airline> getAllAirlines() {
        return airlineService.getAllAirlines();
    }

}
