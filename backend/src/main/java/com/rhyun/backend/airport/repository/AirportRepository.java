package com.rhyun.backend.airport.repository;

import com.rhyun.backend.airport.model.Airport;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AirportRepository extends MongoRepository<Airport, String> {
}
