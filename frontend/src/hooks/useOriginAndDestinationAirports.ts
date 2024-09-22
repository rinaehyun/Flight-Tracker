import {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {AirlinesAsInput, AirportAddressAsInput, AirportsAsInput} from "../types/enum.ts";
import {Flight} from "../types/model/dataType.ts";

export const useFetchOptions = (
    iataCodeForOrigin: string,
    iataCodeForDestination: string
) => {
    const [originAirport, setOriginAirport] = useState<Airport>();
    const [destinationAirport, setDestinationAirport] = useState<Airport>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAirportsData = async () => {
            try {
                const [originAirport, destinationAirport] = await Promise.all([
                    axios.get<Flight>("/api/airport/iata/{iataCodeForOrigin}"),
                    axios.get<Flight>("/api/airport/iata/{iataCodeForDestination}")
                ]);
                setOriginAirport(originAirport.data);
                setDestinationAirport(destinationAirport.data);
            } catch {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchAirportsData();
    }, []);

    return { originAirport, destinationAirport };

}
