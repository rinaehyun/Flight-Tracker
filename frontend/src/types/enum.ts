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


export enum Airport {
    AMS = 'Amsterdam, Netherlands',
    FRA = 'Frankfurt, Germany',
    HND = 'Tokyo, Japan',
    ICN = 'Incheon, South Korea',
    IST = 'Istanbul, Turkey',
    SEA = 'Seattle, USA',
    SFO = 'San Francisco, USA',
    SIN = 'Singapore, Singapore',
    SYD = 'Sydney, Australia',
    TPE = 'Taipei, Taiwan',
}

export const AirportsAsList = Object.entries(Airport).map(([key, value]) => ({
    code: key,
    name: value
}));


export type Filter = {
    airline: string | undefined,
    origin: string | undefined,
}