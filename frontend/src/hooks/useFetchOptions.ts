import {useEffect, useState} from "react";
import {AirlinesAsInput, AirportAddressAsInput, AirportsAsInput} from "../types/enum.ts";
import axios from "axios";

export const useFetchOptions = () => {
    const [airports, setAirports] = useState<AirportsAsInput[]>([]);
    const [airportAddress, setAirportAddress] = useState<AirportAddressAsInput[]>([]);
    const [airlines, setAirlines] = useState<AirlinesAsInput[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [airportsResponse,
                    airportAddressResponse,
                    airlinesResponse] = await Promise.all([
                        axios.get<AirportsAsInput[]>("/api/airport/options-for-input"),
                        axios.get<AirportAddressAsInput[]>("api/airport/address-options-for-input"),
                        axios.get<AirlinesAsInput[]>("/api/airline/options-for-input")
                ]);

                setAirports(airportsResponse.data);
                setAirportAddress(airportAddressResponse.data);
                setAirlines(airlinesResponse.data);
            } catch {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { airports, airportAddress, airlines, loading, error };
};