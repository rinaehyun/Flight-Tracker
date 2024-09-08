package com.rhyun.backend.airport.service;

import com.rhyun.backend.airport.dto.GetAirportDto;
import com.rhyun.backend.airport.exception.AirportNotFoundException;
import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.repository.AirportRepository;
import com.rhyun.backend.utils.StringHelper;
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

    public List<GetAirportDto> getAirportOptions() {
        List<Airport> airports = getAllAirports();

        List<GetAirportDto> airportOptions = new ArrayList<>();

        for (Airport airport : airports) {
            String name = StringHelper.capitalizeFirstLetter(airport.name() + ", " + airport.address().countryName());
            airportOptions.add(new GetAirportDto(airport.iataCode(), name));
        }

        return airportOptions;
    }

    public Airport getAirportById(String id) {
        return airportRepository.findById(id)
                .orElseThrow(() -> new AirportNotFoundException("The Airport with id " + id + " cannot be found."));
    }

    public void deleteAirportById(String id) {
        airportRepository.deleteById(id);
        System.out.println("The Airport with id "+ id + " has been deleted.");
    }
}
