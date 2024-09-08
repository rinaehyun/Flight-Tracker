package com.rhyun.backend.airline.service;

import com.rhyun.backend.airline.dto.GetAirlineDto;
import com.rhyun.backend.airline.model.Airline;
import com.rhyun.backend.airline.repository.AirlineRepository;
import com.rhyun.backend.utils.StringHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AirlineService {

    private final AirlineRepository airlineRepository;

    public AirlineService(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    public List<Airline> getAllAirlines() {
        return airlineRepository.findAll();
    }

    public List<GetAirlineDto> getAirlineOptions() {
        List<Airline> airlines = getAllAirlines();

        List<GetAirlineDto> airlineOptions = new ArrayList<>();

        for (Airline airline : airlines) {
            String name = StringHelper.capitalizeFirstLetter(airline.businessName());
            airlineOptions.add(new GetAirlineDto(airline.iataCode(), name));
        }

        return airlineOptions;
    }

}
