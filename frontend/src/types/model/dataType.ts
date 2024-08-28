import {Airline, FlightStatus} from "../enum.ts";

export type Flight = {
    id: string,
    flightCode: string,
    airline: Airline,
    origin: string,
    destination: string,
    aircraftType: string,
    flightStatus: FlightStatus
}

export const AirlinesAsList = Object.entries(Airline).map(([key, value]) => ({
    code: key,
    name: value
}));

export type NewFlight = {
    flightCode: string,
    airline: string,
    origin: string,
    destination: string,
    aircraftType: string,
    flightStatus: FlightStatus
}