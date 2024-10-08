package com.rhyun.backend.airline.service;

import com.rhyun.backend.airline.dto.AirlineDto;
import com.rhyun.backend.airline.dto.GetAirlineDto;
import com.rhyun.backend.airline.exception.AirlineAlreadyExistsException;
import com.rhyun.backend.airline.exception.AirlineNotFoundException;
import com.rhyun.backend.airline.model.Airline;
import com.rhyun.backend.airline.repository.AirlineRepository;
import com.rhyun.backend.globalservice.IdService;
import com.rhyun.backend.utils.StringHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AirlineService {

    private final AirlineRepository airlineRepository;
    private final IdService idService;

    public AirlineService(AirlineRepository airlineRepository, IdService idService) {
        this.airlineRepository = airlineRepository;
        this.idService = idService;
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

    public Airline findAirlineByIataCode(String iataCode) {
        return airlineRepository.findAirlineByIataCode(iataCode)
                .orElseThrow(() -> new AirlineNotFoundException("Airline with IATA Code " + iataCode + " cannot be found."));
    }

    public Airline createAirline(AirlineDto airlineDto) {
        if (airlineRepository.findAirlineByIataCode(airlineDto.iataCode()).isPresent()) {
            throw new AirlineAlreadyExistsException("Airline with IATA Code " + airlineDto.iataCode() +  " already exists.");
        }

        Airline airlineToSave = new Airline(
                idService.randomId(),
                airlineDto.iataCode(),
                airlineDto.businessName(),
                airlineDto.commonName()
        );
        return airlineRepository.save(airlineToSave);
    }

    public void deleteAirline(String id) {
        airlineRepository.deleteById(id);
    }

    public Airline updateAirline(String id, AirlineDto airlineDto) {
        Airline airlineToUpdate = airlineRepository.findById(id)
                .orElseThrow(() -> new AirlineNotFoundException("Airline with id " + id + " cannot be found."))
                .withIataCode(airlineDto.iataCode())
                .withBusinessName(airlineDto.businessName())
                .withCommonName(airlineDto.commonName());

        return airlineRepository.save(airlineToUpdate);
    }
}
