import './AirportPage.css'
import {useEffect, useState} from "react";
import {Airport} from "../../types/model/dataType.ts";
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";
import {capitalizeFirstLetter} from "../../utils/funtioncs.ts";

type AirportPageProps = {
    loggedInUser: BasicUser | null | undefined,
}

export default function AirportPage({ loggedInUser }: AirportPageProps ) {
    const [airports, setAirports] = useState<Airport[]>([]);

    const fetchAllAirports = () => {
        if (loggedInUser?.username) {
            axios.get("/api/airport")
                .then(response=> {
                    setAirports(response.data)
                })
                .catch(error => alert(error));
        }
    }

    useEffect(() => {
        fetchAllAirports();
    }, []);

    return (
        <div>
            <h3>Airport Information</h3>
            <section>
                {airports.map(airport => (
                    <div key={airport.id} className={"airport-card"}>
                        <p>IATA Code: {airport.iataCode}</p>
                        <p>Location: {capitalizeFirstLetter(airport.name)}, {capitalizeFirstLetter(airport.address.countryName)} </p>
                    </div>
                ))}
            </section>
        </div>
    )
}