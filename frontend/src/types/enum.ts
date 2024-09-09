export enum Airline {
    UNKNOWN = 'Unknown',
    CI = 'CHINA AIR',
    DL = 'DELTA AIR LINES',
    KE = 'KOREAN AIR',
    KL = 'KLM ROYAL DUTCH AIRLINES',
    LH = 'LUFTHANSA',
    NH = 'ALL NIPPON AIRWAYS',
    NQ = 'AIR JAPAN COMPANY LTD',
    QF = 'QANTAS AIRWAYS',
    SQ = 'SINGAPORE AIRLINES',
    TK = 'TURKISH AIRLINES'
}

export const AirlinesAsList = Object.entries(Airline).map(([key, value]) => ({
    code: key,
    name: value
}));

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

export type AirlineAsInput = {
    code: string,
    name: string,
}

export type Filter = {
    airline: string | undefined,
    origin: string | undefined,
    destination: string | undefined,
}