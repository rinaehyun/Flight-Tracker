import {useEffect, useState} from "react";
import {Airport} from "../../types/model/dataType.ts";
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";

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
                    <p key={airport.id}>{airport.name}</p>
                ))}
            </section>
        </div>
    )
}