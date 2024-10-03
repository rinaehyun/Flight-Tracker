package com.rhyun.backend.airline.repository;

import com.rhyun.backend.airline.model.Airline;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AirlineRepository extends MongoRepository<Airline, String> {
    Optional<Airline> findAirlineByIataCode(String iataCode);
}
