import './FlightForm.css'
import {NewFlight} from "../../../types/model/dataType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent} from "react";
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {capitalizeFirstLetter} from "../../../utils/funtioncs.ts";
import {Airline, AirlinesAsList, FlightStatus, FlightStatusList} from "../../../types/enum.ts";

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

    const handleAirlineChange = (event: SyntheticEvent<Element, Event>, value: string) => {
        if (value) {
            console.log(event.target);
            console.log(value);
            console.log(AirlinesAsList.filter(airline => value.includes(airline.code))[0].code);
            const airlineToSave= AirlinesAsList.filter(airline => value.includes(airline.code))[0].code;
            setNewFlight({ ...newFlight, airline: airlineToSave as Airline });
        }
    };

    return (
        <form className={"add-flight-form"} onSubmit={handleSubmit}>
            <TextField
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
                options={AirlinesAsList}
                getOptionLabel={(option) => option.code + ' - ' + capitalizeFirstLetter(option.name)}
                sx={{margin: "auto", fontSize: "12px"}}
                onInputChange={handleAirlineChange}
                renderInput={(params) =>
                    <TextField
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
                    label="Age"
                >
                    {FlightStatusList.map((status) => (
                        <MenuItem key={status} value={status}>{capitalizeFirstLetter(status)}</MenuItem>
                    ))}
                </Select>
            </FormControl>

                {/*<FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newFlight.flightStatus}
                    label={"Flight Status"}
                    onChange={handleChange}
                >
                    {FlightStatus}
                    <MenuItem value={10}>Flight</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>*/}
            <button style={{ marginTop: "50px" }}>Add a Flight Data</button>
        </form>
)
}