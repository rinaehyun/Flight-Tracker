import './AirlineForm.css';
import {TextField} from "@mui/material";
import {NewAirline} from "../../types/model/dataType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";

type AirlineFormProps = {
    newAirline: NewAirline,
    setNewAirline: Dispatch<SetStateAction<NewAirline>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    buttonLabel: string
}

export default function AirlineForm({ newAirline, setNewAirline, handleSubmit, buttonLabel }: Readonly<AirlineFormProps>) {
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewAirline(({...newAirline, [event.target.name]: event.target.value.toUpperCase()}));
    }

    console.log(newAirline)
    return (
        <form className={"airline-form"} onSubmit={handleSubmit} >
            <TextField
                required
                id={"outlined-basic"}
                label={"IATA Code"}
                variant={"standard"}
                placeholder={"KE"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"iataCode"}
                value={newAirline.iataCode}
                onChange={handleChange}
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
                value={newAirline.businessName}
                onChange={handleChange}
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
                value={newAirline.commonName}
                onChange={handleChange}
                autoComplete={"off"}
            />
            <button
                type={"submit"}
                className={"airline-form-submit"}
            >{buttonLabel}</button>
        </form>
    )
}