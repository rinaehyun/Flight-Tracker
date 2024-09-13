import './AirportPage.css'
import {useEffect, useState} from "react";
import {Airport} from "../../types/model/dataType.ts";
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";
import {capitalizeFirstLetter} from "../../utils/funtioncs.ts";
import {AirportFilterType} from "../../types/enum.ts";
import AirportFilter from "./AirportFilter/AirportFilter.tsx";

type AirportPageProps = {
    loggedInUser: BasicUser | null | undefined,
}

export default function AirportPage({ loggedInUser }: AirportPageProps ) {
    const [airportsData, setAirportsData] = useState<Airport[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<AirportFilterType>({
        airport: undefined
    });

    const fetchAllAirports = () => {
        if (loggedInUser?.username) {
            axios.get("/api/airport")
                .then(response=> {
                    setAirportsData(response.data)
                })
                .catch(error => alert(error));
        }
    }

    useEffect(() => {
        fetchAllAirports();
    }, []);

    const filteredAirportsData = airportsData
        .filter(airport => selectedFilter.airport ? airport.iataCode === selectedFilter.airport : airport);

    return (
        <div>
            <h3>Airport Information</h3>
            <AirportFilter setSelectedFilter={setSelectedFilter} />

            <section>
                {filteredAirportsData.map(airport => (
                    <div key={airport.id} className={"airport-card"}>
                        <p>IATA Code: {airport.iataCode}</p>
                        <p>Location: {capitalizeFirstLetter(airport.name)}, {capitalizeFirstLetter(airport.address.countryName)} </p>
                    </div>
                ))}
            </section>
        </div>
    )
}