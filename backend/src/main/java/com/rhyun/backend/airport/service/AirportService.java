package com.rhyun.backend.airport.service;

import com.rhyun.backend.airport.dto.AirportDto;
import com.rhyun.backend.airport.dto.GetAirportAddressDto;
import com.rhyun.backend.airport.dto.GetAirportDto;
import com.rhyun.backend.airport.exception.AirportNotFoundException;
import com.rhyun.backend.airport.model.Airport;
import com.rhyun.backend.airport.repository.AirportRepository;
import com.rhyun.backend.globalservice.IdService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.rhyun.backend.utils.StringHelper.capitalizeFirstLetter;

@Service
public class AirportService {

    private final AirportRepository airportRepository;
    private final IdService idService;
    private String airportWithId = "The airport with id ";

    public AirportService(AirportRepository airportRepository, IdService idService) {
        this.airportRepository = airportRepository;
        this.idService = idService;
    }

    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    public List<GetAirportDto> getAirportOptions() {
        List<Airport> airports = getAllAirports();

        List<GetAirportDto> airportOptions = new ArrayList<>();

        for (Airport airport : airports) {
            String name = capitalizeFirstLetter(airport.name() + ", " + airport.address().countryName());
            airportOptions.add(new GetAirportDto(airport.iataCode(), name));
        }

        return airportOptions;
    }

    public List<GetAirportAddressDto> getAirportAddressOptions() {
        List<Airport> airports = getAllAirports();

        List<GetAirportAddressDto> airportAddressOptions = new ArrayList<>();

        for (Airport airport : airports) {
            airportAddressOptions.add(new GetAirportAddressDto(
                    capitalizeFirstLetter(airport.address().countryName()),
                    airport.address().countryCode(),
                    airport.address().regionCode()
            ));
        }

        return airportAddressOptions;
    }

    public Airport getAirportById(String id) {
        return airportRepository.findById(id)
                .orElseThrow(() -> new AirportNotFoundException(airportWithId + id + " cannot be found."));
    }

    public void deleteAirportById(String id) {
        airportRepository.deleteById(id);
    }
    
    public Airport createAirport(AirportDto airportDto) {
        Airport airportToSave = new Airport(
                idService.randomId(),
                airportDto.name(),
                airportDto.iataCode(),
                airportDto.geoCode(),
                airportDto.address(),
                airportDto.timeZone()
        );
        return airportRepository.save(airportToSave);
    }

    public Airport updateAirport(String id, AirportDto airportDto) {
        Airport airportToUpdate = airportRepository.findById(id)
                .orElseThrow(() -> new AirportNotFoundException(airportWithId + id + " cannot be found."))
                .withName(airportDto.name())
                .withIataCode(airportDto.iataCode())
                .withGeoCode(airportDto.geoCode())
                .withAddress(airportDto.address())
                .withTimeZone(airportDto.timeZone());

        return airportRepository.save(airportToUpdate);
    }

    public Airport getAirportByIataCode(String iataCode) {
        return airportRepository.getAirportByIataCode(iataCode);
    }
}
