import './FlightFilter.css';
import {AirlinesAsList, AirportsAsInput, Filter} from "../../../../types/enum.ts";
import {capitalizeFirstLetter} from "../../../../utils/funtioncs.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import axios from "axios";

type FlightFilterProps = {
    selectedFilter: Filter,
    setSelectedFilter: Dispatch<SetStateAction<Filter>>,
}

export default function FlightFilter({ selectedFilter, setSelectedFilter }: Readonly<FlightFilterProps>) {
    const [filter, setFilter] = useState<Filter>({
        airline: undefined,
        origin: undefined,
        destination: undefined
    });
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const [airports, setAirports] = useState<AirportsAsInput[]>([{
        code: '',
        name: ''
    }]);

    useEffect(() => {
        axios.get("/api/airport/options-for-input")
            .then(response => {
                setAirports(response.data);
            })
            .catch(error => alert(error));
    }, [])

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilter({ ...filter, [name]: value })
        setIsDisabled(false);
    }

    useEffect(() => {
        setFilter({airline: selectedFilter.airline, origin: selectedFilter.origin, destination: selectedFilter.destination})
        console.log('Updated filter:', filter);
    }, []);

    const handleReset = () => {
        setSelectedFilter({airline: undefined, origin: undefined, destination: undefined})
        setIsDisabled(true);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSelectedFilter({airline: filter.airline, origin: filter.origin, destination: filter.destination})
    }

    return (
        <form onSubmit={handleSubmit} className={"filter-form"}>
            <div className={"dropdown-filter"}>
                <label className={"dropdown-label"}>Airline</label>
                <select
                    name={"airline"}
                    onChange={handleChange}
                    className={"airline-dropdown"}
                >
                    <option>All</option>
                    {AirlinesAsList.map((airline) => (
                        <option key={airline.code} value={airline.code}>
                            {airline.code + ' - ' + capitalizeFirstLetter(airline.name)}
                        </option>
                    ))}
                </select>
            </div>
            <div className={"dropdown-filter"}>
                <label className={"dropdown-label"}>Departure</label>
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
            <div className={"dropdown-filter"}>
                <label className={"dropdown-label"}>Arrival</label>
                <select
                    name={"destination"}
                    onChange={handleChange}
                    className={"destination-dropdown"}
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
    )
}