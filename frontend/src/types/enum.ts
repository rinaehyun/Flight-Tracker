export type FlightStatus = "SCHEDULED" | "BOARDING" | "DELAYED" | "IN_AIR" |
    "LANDED"| "CANCELLED" | "DIVERTED" | "ARRIVED" | "UNKNOWN";

export const FlightStatusList : FlightStatus[] = [
    "SCHEDULED", "BOARDING", "DELAYED", "IN_AIR",
    "LANDED", "CANCELLED", "DIVERTED", "ARRIVED", "UNKNOWN"
];

export type TimeZoneOffSet = "-11:00" | "-10:00" | "-09:00" | "-08:00" | "-07:00" | "-06:00" |
    "-05:00" | "-04:00" | "-03:00" | "-02:00" | "-01:00" |
    "00:00" | "+01:00" | "+02:00" | "+03:00" | "+04:00" | "+05:00" | "+06:00" |
    "+07:00" | "+08:00" | "+09:00" | "+10:00" | "+11:00" | "+12:00";

export const TimeZoneOffSetList : TimeZoneOffSet[] = [
    "-11:00", "-10:00", "-09:00", "-08:00", "-07:00", "-06:00",
    "-05:00", "-04:00", "-03:00", "-02:00", "-01:00",
    "00:00", "+01:00", "+02:00", "+03:00", "+04:00", "+05:00", "+06:00",
    "+07:00", "+08:00", "+09:00", "+10:00", "+11:00", "+12:00"
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
    country: string | undefined,
    airport: string | undefined
}