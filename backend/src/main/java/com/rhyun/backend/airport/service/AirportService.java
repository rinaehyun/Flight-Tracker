package com.rhyun.backend.airport.service;

import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.repository.AirportRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AirportService {

    private final AirportRepository airportRepository;

    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    public List<String> getAirportOptions() {
        List<Airport> airports = getAllAirports();

        List<String> airportOptions = new ArrayList<>();

        for (Airport airport : airports) {
            String airportOption = airport.iataCode() + " - " + airport.name() + ", " + airport.address().countryName();
            airportOptions.add(airportOption);
        }

        return airportOptions;
    }
}
