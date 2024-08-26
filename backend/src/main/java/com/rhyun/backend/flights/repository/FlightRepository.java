package com.rhyun.backend.flights.repository;

import com.rhyun.backend.flights.model.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends MongoRepository<Flight, String> {
}
