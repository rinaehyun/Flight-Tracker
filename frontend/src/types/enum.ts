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


export type FlightStatus = "SCHEDULED" | "BOARDING" | "DELAYED" | "IN_AIR" |
    "LANDED"| "CANCELLED" | "DIVERTED" | "ARRIVED" | "UNKNOWN";

export const FlightStatusList : FlightStatus[] = [
    "SCHEDULED", "BOARDING", "DELAYED", "IN_AIR",
    "LANDED", "CANCELLED", "DIVERTED", "ARRIVED", "UNKNOWN"
];
