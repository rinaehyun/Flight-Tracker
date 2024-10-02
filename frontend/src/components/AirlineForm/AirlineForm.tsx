import './AirlineForm.css';
import {TextField} from "@mui/material";

type AirlineFormProps = {
    buttonLabel: string
}

export default function AirlineForm({ buttonLabel }: Readonly<AirlineFormProps>) {
    return (
        <form className={"airline-form"}>
            <TextField
                required
                id={"outlined-basic"}
                label={"IATA Code"}
                variant={"standard"}
                placeholder={"KE"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"iataCode"}
                onChange={() => {}}
                autoComplete={"off"}
            />
            <TextField
                required
                id={"outlined-basic"}
                label={"Business Name"}
                variant={"standard"}
                placeholder={"KOREAN AIR"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"businessName"}
                onChange={() => {}}
                autoComplete={"off"}
            />
            <TextField
                required
                id={"outlined-basic"}
                label={"Common Name"}
                variant={"standard"}
                placeholder={"KOREAN AIR"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"commonName"}
                onChange={() => {}}
                autoComplete={"off"}
            />
            <button
                type={"submit"}
                className={"airline-form-submit"}
            >{buttonLabel}</button>
        </form>
    )
}