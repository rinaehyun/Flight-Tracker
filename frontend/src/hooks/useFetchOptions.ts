import {useEffect, useState} from "react";
import {AirlinesAsInput, AirportsAsInput} from "../types/enum.ts";
import axios from "axios";

export const useFetchOptions = () => {
    const [airports, setAirports] = useState<AirportsAsInput[]>([]);
    const [airlines, setAirlines] = useState<AirlinesAsInput[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [airportsResponse, airlinesResponse] = await Promise.all([
                    axios.get<AirportsAsInput[]>("/api/airport/options-for-input"),
                    axios.get<AirlinesAsInput[]>("/api/airline/options-for-input")
                ]);

                setAirports(airportsResponse.data);
                setAirlines(airlinesResponse.data);
            } catch {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { airports, airlines, loading, error };
};