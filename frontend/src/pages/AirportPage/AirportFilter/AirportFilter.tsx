import {useFetchOptions} from "../../../hooks/useFetchOptions.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {AirportFilterType} from "../../../types/enum.ts";

type AirportFilterProps = {
    setSelectedFilter: Dispatch<SetStateAction<AirportFilterType>>,
}

export default function AirportFilter({ setSelectedFilter }: AirportFilterProps) {
    const { airports } = useFetchOptions();
    const [filter, setFilter] = useState<AirportFilterType>({
        airport: undefined
    });
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

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

    return (
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
    )
}