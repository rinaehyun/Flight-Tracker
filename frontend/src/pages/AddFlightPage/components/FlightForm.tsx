import './FlightForm.css'
import {NewFlight} from "../../../types/model/dataType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent} from "react";
import {
    Autocomplete,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {capitalizeFirstLetter} from "../../../utils/funtioncs.ts";
import {Airline, AirlinesAsList, Airport, AirportsAsList, FlightStatus, FlightStatusList} from "../../../types/enum.ts";

type FlightFormProps = {
    newFlight: NewFlight,
    setNewFlight: Dispatch<SetStateAction<NewFlight>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function FlightForm({newFlight, setNewFlight, handleSubmit}: FlightFormProps) {

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement> | SelectChangeEvent<FlightStatus>) => {
        const { name, value } = event.target;
        console.log(name);
        console.log(value);
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
            const originToSave= AirportsAsList.filter(airport => value.includes(airport.code))[0].code;
            setNewFlight({ ...newFlight, origin: originToSave as Airport });
        }
    };

    const handleDestinationChange = (_event: SyntheticEvent<Element, Event>, value: string) => {
        if (value) {
            const destinationToSave= AirportsAsList.filter(airport => value.includes(airport.code))[0].code;
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
                renderInput={(params) =>
                    <TextField
                        required
                        {...params}
                        label={"Airline"}
                        variant={"standard"}
                        placeholder={"Korean Air"}
                        name={"airline"}
                        value={newFlight.airline}
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
            />
            <Autocomplete
                disablePortal
                options={AirportsAsList}
                getOptionLabel={(option) => option.code + ' - ' + capitalizeFirstLetter(option.name)}
                sx={{margin: "auto", fontSize: "12px"}}
                onInputChange={handleOriginChange}
                renderInput={(params) =>
                    <TextField
                        required
                        {...params}
                        label={"Origin"}
                        variant={"standard"}
                        placeholder={"SFO - San Francisco, USA"}
                        name={"origin"}
                        value={newFlight.origin}
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
                />
            </div>
            <Autocomplete
                disablePortal
                options={AirportsAsList}
                getOptionLabel={(option) => option.code + ' - ' + capitalizeFirstLetter(option.name)}
                sx={{margin: "auto", fontSize: "12px"}}
                onInputChange={handleDestinationChange}
                renderInput={(params) =>
                    <TextField
                        required
                        {...params}
                        label={"Destination"}
                        variant={"standard"}
                        placeholder={"FRA - Frankfurt, Germany"}
                        name={"destination"}
                        value={newFlight.destination}
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
                >
                    {FlightStatusList.map((status) => (
                        <MenuItem key={status} value={status}>{capitalizeFirstLetter(status)}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <button style={{marginTop: "50px"}}>Add a Flight Data</button>
        </form>
    )
}