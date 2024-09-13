import './AirportPage.css'
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Airport} from "../../types/model/dataType.ts";
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";
import {capitalizeFirstLetter} from "../../utils/funtioncs.ts";
import {AirportFilter} from "../../types/enum.ts";
import {useFetchOptions} from "../../hooks/useFetchOptions.ts";

type AirportPageProps = {
    loggedInUser: BasicUser | null | undefined,
}

export default function AirportPage({ loggedInUser }: AirportPageProps ) {
    const { airports } = useFetchOptions();
    const [airportsData, setAirportsData] = useState<Airport[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<AirportFilter>({
        airport: undefined
    });
    const [filter, setFilter] = useState<AirportFilter>({
        airport: undefined
    });
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

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

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilter({ airport: event.target.value });
        setIsDisabled(false);
    }

    const handleReset = () => {
        setSelectedFilter({ airport: undefined })
        setIsDisabled(true);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSelectedFilter({ airport: filter.airport })
    }

    const filteredAirportsData = airportsData
        .filter(airport => selectedFilter.airport ? airport.iataCode === selectedFilter.airport : airport);

    return (
        <div>
            <h3>Airport Information</h3>
            <form onSubmit={handleSubmit} className={"filter-form"}>
                <div className={"dropdown-filter"}>
                    <label className={"dropdown-label"}>Airport</label>
                    <select
                        name={"origin"}
                        onChange={handleChange}
                        className={"origin-dropdown"}
                    >
                        <option>All</option>
                        {airports.map((airport) => (
                            <option key={airport.code} value={airport.code}>
                                {airport.code + ' - ' + airport.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={"filter-buttons"}>
                    <button
                        type={"reset"}
                        className={"reset-btn"}
                        onClick={handleReset}
                    >Reset
                    </button>
                    <button
                        type={"submit"}
                        className={"apply-btn"}
                        disabled={isDisabled}
                    >Apply
                    </button>
                </div>
            </form>
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