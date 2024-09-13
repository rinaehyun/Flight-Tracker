export type FlightStatus = "SCHEDULED" | "BOARDING" | "DELAYED" | "IN_AIR" |
    "LANDED"| "CANCELLED" | "DIVERTED" | "ARRIVED" | "UNKNOWN";

export const FlightStatusList : FlightStatus[] = [
    "SCHEDULED", "BOARDING", "DELAYED", "IN_AIR",
    "LANDED", "CANCELLED", "DIVERTED", "ARRIVED", "UNKNOWN"
];

export type AirportsAsInput = {
    code: string,
    name: string,
}

export type AirlinesAsInput = {
    code: string,
    name: string,
}

export type AirportAddressAsInput = {
    countryName: string,
    countryCode: string,
    regionCode: string,
}

export type Filter = {
    airline: string | undefined,
    origin: string | undefined,
    destination: string | undefined,
}

export type AirportFilterType = {
    region: string | undefined,
    airport: string | undefined
}