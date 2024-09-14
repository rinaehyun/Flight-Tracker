import './AirportForm.css'
import {Autocomplete, InputAdornment, SelectChangeEvent, TextField} from "@mui/material";
import {NewAirport} from "../../types/model/dataType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent} from "react";
import {FlightStatus, TimeZoneOffSet, TimeZoneOffSetList} from "../../types/enum.ts";
import {capitalizeFirstLetter} from "../../utils/funtioncs.ts";
import {regionOptions} from "../../utils/Mapping.ts";

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
        } else if (name === "countryName" || name === "countryCode") {
            setNewAirport((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
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

    const handleRegionChange = (_event: SyntheticEvent<Element, Event>, value: { code: string, name: string } | null) => {
        if (value) {
            const regionToSave = value.code;
            setNewAirport((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    regionCode: regionToSave || ''
                }
            }));
        }
    };

    const handleTimeZoneChange = (_event: SyntheticEvent<Element, Event>, value: TimeZoneOffSet | null) => {
        if (value) {
            setNewAirport((prev) => ({
                ...prev,
                timeZone: {
                    ...prev.timeZone,
                    offSet: value
                }
            }));
        }
    };

    return (
        <form className={"add-airport-form"} onSubmit={handleSubmit}>
            <Autocomplete
                disablePortal
                options={regionOptions}
                getOptionLabel={(option) => option.code + ' - ' + capitalizeFirstLetter(option.name)}
                sx={{margin: "auto", fontSize: "12px"}}
                onChange={handleRegionChange}
                value={regionOptions.find(option => option.code === newAirport.address.regionCode) || null}
                renderInput={(params) =>
                    <TextField
                        required
                        {...params}
                        label={"Region"}
                        variant={"standard"}
                        placeholder={""}
                        name={"regionCode"}
                    />
                }
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
            <Autocomplete
                disablePortal
                options={TimeZoneOffSetList}
                getOptionLabel={(option) => option}
                sx={{margin: "auto", fontSize: "12px"}}
                onChange={handleTimeZoneChange}
                value={TimeZoneOffSetList.find(option => option === newAirport.timeZone.offSet) || null}
                renderInput={(params) =>
                    <TextField
                        required
                        {...params}
                        label={"Time Zone"}
                        variant={"standard"}
                        placeholder={""}
                        name={"offSet"}
                    />
                }
            />
            <button
                type={"submit"}
                className={"airport-form-submit"}
            >{buttonLabel}</button>
        </form>
    )
}