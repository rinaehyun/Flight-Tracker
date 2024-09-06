import './FlightForm.css'
import {NewFlight} from "../../types/model/dataType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent, useEffect, useState} from "react";
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
    Airline,
    AirlinesAsList,
    Airport,
    AirportsAsInput,
    FlightStatus,
    FlightStatusList
} from "../../types/enum.ts";
import axios from "axios";

type FlightFormProps = {
    newFlight: NewFlight,
    setNewFlight: Dispatch<SetStateAction<NewFlight>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    buttonLabel: string,
    editable: boolean,
}

export default function FlightForm({newFlight, setNewFlight, handleSubmit, buttonLabel, editable}: Readonly<FlightFormProps>) {
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

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement> | SelectChangeEvent<FlightStatus>) => {
        const { name, value } = event.target;
        setNewFlight({ ...newFlight, [name]: value });
    }

    const handleAirlineChange = (_event: SyntheticEvent<Element, Event>, value: string) => {
        if (value) {
            const airlineToSave= AirlinesAsList.filter(airline => value.includes(airline.code))[0].code;
            setNewFlight({ ...newFlight, airline: airlineToSave as Airline });
        }
    };

    const handleOriginChange = (_event: SyntheticEvent<Element, Event>, value: string) => {
        if (value) {
            const originToSave= airports.filter(airport => value.includes(airport.code))[0].code;
            setNewFlight({ ...newFlight, origin: originToSave as Airport });
        }
    };

    const handleDestinationChange = (_event: SyntheticEvent<Element, Event>, value: string) => {
        if (value) {
            const destinationToSave= airports.filter(airport => value.includes(airport.code))[0].code;
            setNewFlight({ ...newFlight, destination: destinationToSave as Airport });
        }
    };

    return (
        <form className={"add-flight-form"} onSubmit={handleSubmit}>
            <Autocomplete
                disablePortal
                options={AirlinesAsList}
                getOptionLabel={(option) => option.code + ' - ' + capitalizeFirstLetter(option.name)}
                sx={{margin: "auto", fontSize: "12px"}}
                onInputChange={handleAirlineChange}
                disabled={!editable}
                value={AirlinesAsList.find(option => option.code === newFlight.airline) || null}
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
                onChange={handleChange}
                autoComplete={"off"}
                disabled={!editable}
            />
            <Autocomplete
                disablePortal
                options={airports}
                getOptionLabel={(option) => option.code + ' - ' + capitalizeFirstLetter(option.name)}
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
                getOptionLabel={(option) => option.code + ' - ' + capitalizeFirstLetter(option.name)}
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
                        <MenuItem key={status} value={status}>{capitalizeFirstLetter(status)}</MenuItem>
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