import './AirportForm.css'
import {InputAdornment, SelectChangeEvent, TextField} from "@mui/material";
import {NewAirport} from "../../types/model/dataType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import {FlightStatus} from "../../types/enum.ts";

type AirportFormProps = {
    newAirport: NewAirport,
    setNewAirport: Dispatch<SetStateAction<NewAirport>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    buttonLabel: string
}

export default function AirportForm({ newAirport, setNewAirport, handleSubmit, buttonLabel}: Readonly<AirportFormProps>) {

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |
        ChangeEvent<HTMLSelectElement> | SelectChangeEvent<FlightStatus>) => {
        const { name, value } = event.target;

        if (name === "latitude" || name === "longitude") {
            setNewAirport((prev) => ({
                ...prev,
                geoCode: {
                    ...prev.geoCode,
                    [name]: value
                }
            }));
        } else if (name === "countryName" || name === "countryCode" || name === "regionCode") {
            setNewAirport((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
        } else if (name === "offSet") {
            setNewAirport((prev) => ({
                ...prev,
                timeZone: {
                    ...prev.timeZone,
                    offSet: value
                }
            }));
        } else {
            setNewAirport((prev) => ({
                ...prev,
                [name]: value
            }));
        }
        console.log(newAirport);
    };

    return (
        <form className={"add-airport-form"} onSubmit={handleSubmit}>
            <TextField
                required
                id={"outlined-basic"}
                label={"Region"}
                variant={"standard"}
                placeholder={""}
                color={"primary"}
                sx={{width: "100%"}}
                name={"regionCode"}
                value={newAirport.address.regionCode}
                onChange={handleChange}
                autoComplete={"off"}
            />
            <TextField
                required
                id={"outlined-basic"}
                label={"Country"}
                variant={"standard"}
                placeholder={"Netherlands"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"countryName"}
                value={newAirport.address.countryName}
                onChange={handleChange}
                autoComplete={"off"}
            />
            <TextField
                required
                id={"outlined-basic"}
                label={"Country Code"}
                variant={"standard"}
                placeholder={"NL"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"countryCode"}
                value={newAirport.address.countryCode}
                onChange={handleChange}
                autoComplete={"off"}
            />
            <TextField
                required
                id={"outlined-basic"}
                label={"City"}
                variant={"standard"}
                placeholder={"Amsterdam"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"name"}
                value={newAirport.name}
                onChange={handleChange}
                autoComplete={"off"}
            />
            <TextField
                required
                id={"outlined-basic"}
                label={"IATA Code"}
                variant={"standard"}
                placeholder={"AMS"}
                color={"primary"}
                sx={{width: "100%"}}
                name={"iataCode"}
                value={newAirport.iataCode}
                onChange={handleChange}
                autoComplete={"off"}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                    label={""}
                    id={"standard-start-adornment"}
                    sx={{ m: 1, width: '17ch', marginLeft: 0, marginTop: "15px" }}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">Latitude</InputAdornment>,
                        },
                    }}
                    variant={"standard"}
                    onChange={handleChange}
                    name={"latitude"}
                    value={newAirport.geoCode.latitude}
                    autoComplete={"off"}
                />
                <TextField
                    label={""}
                    id={"standard-start-adornment"}
                    sx={{ m: 1, width: '17ch', marginRight: 0, marginTop: "15px" }}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">Longitude</InputAdornment>,
                        },
                    }}
                    variant={"standard"}
                    onChange={handleChange}
                    name={"longitude"}
                    value={newAirport.geoCode.longitude}
                    autoComplete={"off"}
                />
            </div>
            <TextField
                required
                id={"outlined-basic"}
                label={"Time Zone"}
                variant={"standard"}
                placeholder={""}
                color={"primary"}
                sx={{width: "100%"}}
                name={"offSet"}
                value={newAirport.timeZone.offSet}
                onChange={handleChange}
                autoComplete={"off"}
            />
            <button
                type={"submit"}
                className={"airport-form-submit"}
            >{buttonLabel}</button>
        </form>
    )
}