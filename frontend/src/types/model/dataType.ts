import {FlightStatus} from "../enum.ts";

export type Flight = {
    id: string,
    flightCode: string,
    airline: string,
    origin: string,
    destination: string,
    departureTime: string,
    arrivalTime: string,
    aircraftType: string,
    flightStatus: FlightStatus,
    duration: string,
}

export type NewFlight = {
    flightCode: string,
    airline: string,
    origin: string,
    destination: string,
    departureTime: string,
    arrivalTime: string,
    aircraftType: string,
    flightStatus: FlightStatus
}

export type Airport = {
    id: string,
    name: string,
    iataCode: string,
    geoCode: {
        latitude: number,
        longitude: number
    },
    address: {
        countryName: string,
        countryCode: string,
        regionCode: string
    },
    timeZone: {
        offSet: string
    }}

export type NewAirport = {
    name: string,
    iataCode: string,
    geoCode: {
        latitude: number,
        longitude: number
    },
    address: {
        countryName: string,
        countryCode: string,
        regionCode: string
    },
    timeZone: {
        offSet: string
    }}