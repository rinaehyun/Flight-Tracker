package com.rhyun.backend.flight.model;

public enum Airline {
    CI("CHINA AIR"),
    DL("DELTA AIR LINES"),
    KE("KOREAN AIR"),
    KL("KLM ROYAL DUTCH AIRLINES"),
    LH("LUFTHANSA"),
    NH("ALL NIPPON AIRWAYS"),
    NQ("AIR JAPAN COMPANY LTD"),
    QF("QANTAS AIRWAYS"),
    SQ("SINGAPORE AIRLINES"),
    TK("TURKISH AIRLINES");

    private final String airlineName;

    Airline(String airlineName) {
        this.airlineName = airlineName;
    }

    public String getAirlineName() {
        return airlineName;
    }
}
