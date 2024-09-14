import './AirportPage.css'
import {useEffect, useState} from "react";
import {Airport} from "../../types/model/dataType.ts";
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";
import {capitalizeFirstLetter} from "../../utils/funtioncs.ts";
import {AirportFilterType} from "../../types/enum.ts";
import AirportFilter from "./components/AirportFilter/AirportFilter.tsx";
import {regionMapping} from "../../utils/Mapping.ts";
import {useNavigate} from "react-router-dom";

type AirportPageProps = {
    loggedInUser: BasicUser | null | undefined,
}

export default function AirportPage({ loggedInUser }: Readonly<AirportPageProps> ) {
    const [airportsData, setAirportsData] = useState<Airport[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<AirportFilterType>({
        region: undefined,
        airport: undefined
    });

    const navigate = useNavigate();

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

    const handleClick = () => {
        navigate('/airport/add');
    }

    const filteredAirportsData = airportsData
        .filter(airport =>
            !selectedFilter.region ||
            regionMapping[airport.address.regionCode] === selectedFilter.region
        )
        .filter(airport =>
            !selectedFilter.airport ||
            airport.iataCode === selectedFilter.airport
        );

    return (
        <div className={"airport-page"}>
            <h3>Airport Information</h3>
            {loggedInUser?.role != "USER" &&
                <button onClick={handleClick} style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "10px",
                    fontSize: "0.7em"
                }}>{"Add"}</button>
            }<AirportFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
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