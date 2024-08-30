import {Airline, FlightStatus} from "../enum.ts";

export type Flight = {
    id: string,
    flightCode: string,
    airline: Airline,
    origin: string,
    destination: string,
    departureTime: string,
    arrivalTime: string,
    aircraftType: string,
    flightStatus: FlightStatus
}

export type NewFlight = {
    flightCode: string,
    airline: string,
    origin: string,
    destination: string,
    aircraftType: string,
    flightStatus: FlightStatus
}