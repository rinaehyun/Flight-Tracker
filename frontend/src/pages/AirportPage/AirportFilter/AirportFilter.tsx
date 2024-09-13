import './AirportFilter.css';
import {useFetchOptions} from "../../../hooks/useFetchOptions.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {AirportFilterType} from "../../../types/enum.ts";
import {regionMapping} from "../../../utils/Mapping.ts";

type AirportFilterProps = {
    selectedFilter: AirportFilterType,
    setSelectedFilter: Dispatch<SetStateAction<AirportFilterType>>,
}

export default function AirportFilter({ selectedFilter, setSelectedFilter }: AirportFilterProps) {
    const { airports, airportAddress } = useFetchOptions();
    const [filter, setFilter] = useState<AirportFilterType>({
        region: undefined,
        airport: undefined
    });
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const [distinctRegions, setDistinctRegions] = useState<string[]>([]);

    useEffect(() => {
        const uniqueRegions = Array.from(new Set(
            airportAddress.map(
                address => regionMapping[address.regionCode]
            ).filter(Boolean)
        ))
            .sort();

        setDistinctRegions(uniqueRegions);
    }, [airportAddress]);

    useEffect(() => {
        setFilter({ region: selectedFilter.region, airport: selectedFilter.airport })
        console.log('Updated airport filter:', filter);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilter({ ...filter, [name]: value });
        setIsDisabled(false);
    }

    const handleReset = () => {
        setSelectedFilter({ region: undefined, airport: undefined })
        setIsDisabled(true);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSelectedFilter({ region: filter.region, airport: filter.airport })
    }

    return (
        <form onSubmit={handleSubmit} className={"airport-filter-form"}>
            <div className={"airport-dropdown-filter"}>
                <label className={"airport-dropdown-label"}>Region</label>
                <select
                    name={"region"}
                    onChange={handleChange}
                    className={"region-dropdown"}
                >
                    <option>All</option>
                    {distinctRegions.map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            </div>
            <div className={"airport-dropdown-filter"}>
                <label className={"airport-dropdown-label"}>Airport</label>
                <select
                    name={"airport"}
                    onChange={handleChange}
                    className={"airport-dropdown"}
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