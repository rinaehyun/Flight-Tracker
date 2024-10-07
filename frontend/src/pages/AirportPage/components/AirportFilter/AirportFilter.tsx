import './AirportFilter.css';
import {useFetchOptions} from "../../../../hooks/useFetchOptions.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {AirportFilterType} from "../../../../types/enum.ts";
import {regionMapping} from "../../../../utils/Mapping.ts";

type AirportFilterProps = {
    selectedFilter: AirportFilterType,
    setSelectedFilter: Dispatch<SetStateAction<AirportFilterType>>,
}

export default function AirportFilter({ selectedFilter, setSelectedFilter }: Readonly<AirportFilterProps>) {
    const { airports, airportAddress } = useFetchOptions();
    const [filter, setFilter] = useState<AirportFilterType>({
        region: undefined,
        country: undefined,
        airport: undefined
    });
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const [distinctRegions, setDistinctRegions] = useState<string[]>([]);
    const [distinctCountries, setDistinctCountries] = useState<string[]>([]);

    useEffect(() => {
        const uniqueRegions = Array.from(new Set(
            airportAddress.map(
                address => regionMapping[address.regionCode]
            ).filter(Boolean)
        ))
            .sort((a, b) => a.localeCompare(b));

        setDistinctRegions(uniqueRegions);
    }, [airportAddress]);

    useEffect(() => {
        if (filter.region) {
            const filteredCountries = Array.from(new Set(
                airportAddress
                    .filter(address => regionMapping[address.regionCode] === filter.region)
                    .map(address => address.countryName)
                    .filter(Boolean)
            )).sort((a, b) => a.localeCompare(b));

            setDistinctCountries(filteredCountries);
        } else {
            // Reset to all countries if no region is selected
            const uniqueCountries = Array.from(
                new Set(airportAddress.map(address => address.countryName).filter(Boolean))
            ).sort((a, b) => a.localeCompare(b));
            setDistinctCountries(uniqueCountries);
        }
    }, [filter.region, airportAddress]);

    // Sync filter with the selectedFilter state
    useEffect(() => {
        setFilter({
            region: selectedFilter.region,
            country: selectedFilter.country,
            airport: selectedFilter.airport
        });
    }, [selectedFilter]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilter({ ...filter, [name]: value });
        setIsDisabled(false);
    };

    const handleReset = () => {
        setFilter({ region: undefined, country: undefined, airport: undefined });
        setSelectedFilter({ region: undefined, country: undefined, airport: undefined });
        setIsDisabled(true);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSelectedFilter({ region: filter.region, country: filter.country, airport: filter.airport });
    };

    return (
        <form onSubmit={handleSubmit} className={"airport-filter-form"}>
            <div className={"airport-dropdown-filter"}>
                <label className={"airport-dropdown-label"}>
                    Region
                    <select
                        name={"region"}
                        onChange={handleChange}
                        className={"region-dropdown"}
                        value={filter.region || ""}
                    >
                        <option>All</option>
                        {distinctRegions.map((region) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className={"airport-dropdown-filter"}>
                <label className={"airport-dropdown-label"}>
                    Country
                    <select
                        name={"country"}
                        onChange={handleChange}
                        className={"country-dropdown"}
                        value={filter.country || ""}
                    >
                        <option>All</option>
                        {distinctCountries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className={"airport-dropdown-filter-hidden"}>
                Airport
                <label className={"airport-dropdown-label"}>
                    <select
                        name={"airport"}
                        onChange={handleChange}
                        className={"airport-dropdown"}
                        value={filter.airport || ""}
                    >
                        <option>All</option>
                        {airports.map((airport) => (
                            <option key={airport.code} value={airport.code}>
                                {airport.code + ' - ' + airport.name}
                            </option>
                        ))}
                    </select>
                </label>
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