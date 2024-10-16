package com.rhyun.backend.airline.controller;

import com.rhyun.backend.airline.dto.AirlineDto;
import com.rhyun.backend.airline.dto.GetAirlineDto;
import com.rhyun.backend.airline.model.Airline;
import com.rhyun.backend.airline.service.AirlineService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/airline")
public class AirlineController {

    private final AirlineService airlineService;

    public AirlineController(AirlineService airlineService) {
        this.airlineService = airlineService;
    }

    @GetMapping
    public List<Airline> getAllAirlines() {
        return airlineService.getAllAirlines();
    }

    @GetMapping("/options-for-input")
    public List<GetAirlineDto> getAirlineOptions() {
        return airlineService.getAirlineOptions();
    }

    @GetMapping("/iata/{iataCode}")
    public Airline getAirlineByIataCode(@PathVariable String iataCode) {
        return airlineService.findAirlineByIataCode(iataCode);
    }

    @GetMapping("/{id}")
    public Airline getAirlineById(@PathVariable String id) {
        return airlineService.findAirlineById(id);
    }

    @PostMapping
    public Airline createAirline(@RequestBody AirlineDto airlineDto) {
        return airlineService.createAirline(airlineDto);
    }

    @DeleteMapping("/{id}")
    public void deleteAirline(@PathVariable String id) {
        airlineService.deleteAirline(id);
    }

    @PutMapping("/{id}")
    public Airline updateAirline(@PathVariable String id, @RequestBody AirlineDto airlineDto) {
        return airlineService.updateAirline(id, airlineDto);
    }
}
