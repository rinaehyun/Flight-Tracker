import './FlightForm.css'
import {AirlinesAsList, NewFlight} from "../../../types/model/dataType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {capitalizeFirstLetter} from "../../../utils/funtioncs.ts";
import {FlightStatus} from "../../../types/enum.ts";

type FlightFormProps = {
    newFlight: NewFlight,
    setNewFlight: Dispatch<SetStateAction<NewFlight>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function FlightForm({newFlight, setNewFlight, handleSubmit}: FlightFormProps) {

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target);
        setNewFlight({...newFlight, [event.target.name]: [event.target.value]});
    }

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
                value={newFlight.flightCode.toString()}
                onChange={handleChange}
            />
            {/*<Autocomplete
                disablePortal
                options={AirlinesAsList}
                getOptionLabel={(option) => option.code + ' - ' + capitalizeFirstLetter(option.name)}
                sx={{margin: "auto", fontSize: "12px"}}
                renderOption={(props, option) => {
                    return (
                        <span {...props} style={{
                            textAlign: "left",
                            fontSize: "14px",
                            flex: 1
                        }}>{option.code + ' - ' + capitalizeFirstLetter(option.name)}</span>
                    );
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label={"Airline"}
                        variant={"standard"}
                        placeholder={"Korean Air"}
                        name={"airline"}
                        value={newFlight.airline}
                        onChange={() => console.log(newFlight.airline)}
                    />
                }
            />*/}

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
            {/*<TextField
                id={"outlined-basic"}
                label={"Flight Status"}
                variant={"standard"}
                placeholder={"Unknown"}
                color={"primary"}
                sx={{ width: "100%" }}
                name={"flightStatus"}
                value={newFlight.flightStatus}
                onChange={handleChange}
            />*/}
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
            <button style={{marginTop: "50px"}}>Create a Flight Data</button>
        </form>
    )
}