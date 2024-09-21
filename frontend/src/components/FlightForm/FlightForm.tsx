import './FlightForm.css'
import {NewFlight} from "../../types/model/dataType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent, useState} from "react";
import {
    Autocomplete,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {capitalizeFirstLetter} from "../../utils/funtioncs.ts";
import {
    FlightStatus,
    FlightStatusList
} from "../../types/enum.ts";
import {useFetchOptions} from "../../hooks/useFetchOptions.ts";

type FlightFormProps = {
    newFlight: NewFlight,
    setNewFlight: Dispatch<SetStateAction<NewFlight>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    buttonLabel: string,
    editable: boolean,
}

export default function FlightForm({newFlight, setNewFlight, handleSubmit, buttonLabel, editable}: Readonly<FlightFormProps>) {
    const { airports, airlines } = useFetchOptions();
    const [flightCodeError, setFlightCodeError] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement> | SelectChangeEvent<FlightStatus>) => {
        const { name, value } = event.target;
        setNewFlight({ ...newFlight, [name]: value });

        if (name === 'flightCode' && flightCodeError) {
            setFlightCodeError(''); // Clear error when flight code is updated
        }
    }

    const handleAirlineChange = (_event: SyntheticEvent<Element, Event>, value: string) => {
        if (value) {
            const selectedAirline = airlines.find(airline => value.includes(airline.code));
            if (selectedAirline) {
                setNewFlight({ ...newFlight, airline: selectedAirline.code, flightCode: selectedAirline.code + (newFlight.flightCode.slice(selectedAirline.code.length) || '') });
            }
        }
    };

    const handleFlightCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const airlineCode = newFlight.airline;

        if (!value.startsWith(airlineCode)) {
            setFlightCodeError(`Flight code must start with the airline code: ${airlineCode}`);
        } else {
            setFlightCodeError(''); // Reset error
        }

        setNewFlight({ ...newFlight, flightCode: value });
    };

    const handleOriginChange = (_event: SyntheticEvent<Element, Event>, value: string) => {
        if (value) {
            const originToSave= airports.filter(airport => value.includes(airport.code))[0].code;
            setNewFlight({ ...newFlight, origin: originToSave });
        }
    };

    const handleDestinationChange = (_event: SyntheticEvent<Element, Event>, value: string) => {
        if (value) {
            const destinationToSave= airports.filter(airport => value.includes(airport.code))[0].code;
            setNewFlight({ ...newFlight, destination: destinationToSave });
        }
    };

    return (
        <form className={"add-flight-form"} onSubmit={handleSubmit}>
            <Autocomplete
                disablePortal
                options={airlines}
                getOptionLabel={(option) => option.code + ' - ' + capitalizeFirstLetter(option.name)}
                sx={{margin: "auto", fontSize: "12px"}}
                onInputChange={handleAirlineChange}
                disabled={!editable}
                value={airlines.find(option => option.code === newFlight.airline) || null}
                renderInput={(params) =>
                    <TextField
                        required
                        {...params}
                        label={"Airline"}
                        variant={"standard"}
                        placeholder={"Korean Air"}
                        name={"airline"}
                    />
                }
            />
            <TextField
                required
                id={"outlined-basic"}
                label={"Flight Code"}
                variant={"standard"}
                placeholder={"KE123"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"flightCode"}
                value={newFlight.flightCode}
                onChange={handleFlightCodeChange}
                autoComplete={"off"}
                disabled={!editable}
                error={!!flightCodeError}
                helperText={flightCodeError}
            />
            <Autocomplete
                disablePortal
                options={airports}
                getOptionLabel={(option) => option.code + ' - ' + option.name}
                sx={{margin: "auto", fontSize: "12px"}}
                onInputChange={handleOriginChange}
                disabled={!editable}
                value={airports.find(option =>  option.code === newFlight.origin) || null}
                renderInput={(params) =>
                    <TextField
                        required
                        {...params}
                        label={"Origin"}
                        variant={"standard"}
                        placeholder={"BKK - Bangkok, Thailand"}
                        name={"origin"}
                    />
                }
            />
            <div className={'time-input-container'}>
                <label className={'time-label'}>Departure Time</label>
                <input
                    type={"datetime-local"}
                    name={"departureTime"}
                    value={newFlight.departureTime}
                    onChange={handleChange}
                    required={true}
                    disabled={!editable}
                />
            </div>
            <Autocomplete
                disablePortal
                options={airports}
                getOptionLabel={(option) => option.code + ' - ' + option.name}
                sx={{margin: "auto", fontSize: "12px"}}
                onInputChange={handleDestinationChange}
                disabled={!editable}
                value={airports.find(option =>  option.code === newFlight.destination) || null}
                renderInput={(params) =>
                    <TextField
                        required
                        {...params}
                        label={"Destination"}
                        variant={"standard"}
                        placeholder={"FRA - Frankfurt, Germany"}
                        name={"destination"}
                    />
                }
            />
            <div className={'time-input-container'}>
                <label className={'time-label'}>Arrival Time</label>
                <input
                    type={"datetime-local"}
                    name={"arrivalTime"}
                    value={newFlight.arrivalTime}
                    onChange={handleChange}
                    required={true}
                    disabled={!editable}
                />
            </div>
            <TextField
                required
                id={"outlined-basic"}
                label={"Aircraft Type"}
                variant={"standard"}
                placeholder={"A380"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"aircraftType"}
                value={newFlight.aircraftType}
                onChange={handleChange}
                autoComplete={"off"}
                disabled={!editable}
            />
            <FormControl variant="standard" sx={{m: 1, width: "100%", margin: 0}}>
                <InputLabel id="demo-simple-select-standard-label">Flight Status</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name={"flightStatus"}
                    value={newFlight.flightStatus}
                    onChange={handleChange}
                    label="Flight Status"
                    style={{textAlign: "left"}}
                    disabled={!editable}
                >
                    {FlightStatusList.map((status) => (
                        <MenuItem key={status} value={status}>
                            {capitalizeFirstLetter(status)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <button
                type={"submit"}
                className={"flight-form-submit"}
                disabled={!editable}
            >{buttonLabel}</button>
        </form>
    )
}