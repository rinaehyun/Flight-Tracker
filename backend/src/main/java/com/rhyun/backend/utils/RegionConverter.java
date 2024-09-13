package com.rhyun.backend.utils;

import java.util.HashMap;
import java.util.Map;

public class RegionConverter {

    private RegionConverter() {}

    private static final Map<String, String> regionMap = new HashMap<>();

    static {
        regionMap.put("AFRICA", "Africa");
        regionMap.put("ASIA", "Asia");
        regionMap.put("AUSTL", "Australia");
        regionMap.put("CAMER", "Central America");
        regionMap.put("CARIB", "Caribbean");
        regionMap.put("EEURO", "Eastern Europe");
        regionMap.put("EURAS", "Eurasia");
        regionMap.put("EUROP", "Europe");
        regionMap.put("IOCEA", "Indian Ocean/Oceania");
        regionMap.put("MEAST", "Middle East");
        regionMap.put("NAMER", "North America");
        regionMap.put("SAMER", "South America");
        regionMap.put("SEASI", "Southeast Asia");
    }

    public static String mapRegionCode(String regionCode) {
        return regionMap.getOrDefault(regionCode, "Unknown Region");
    }
}
