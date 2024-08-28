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