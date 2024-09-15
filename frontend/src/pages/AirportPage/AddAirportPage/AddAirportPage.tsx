import './AddAirportPage.css';
import {Box} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NavigateFunction, useNavigate} from "react-router-dom";
import AirportForm from "../../../components/AirportForm/AirportForm.tsx";
import {FormEvent, useState} from "react";
import {NewAirport} from "../../../types/model/dataType.ts";
import axios from "axios";

export default function AddAirportPage() {
    const [newAirport, setNewAirport] = useState<NewAirport>({
        name: "",
        iataCode: "",
        geoCode: {
            latitude: 0,
            longitude: 0
        },
        address: {
            countryName: "",
            countryCode: "",
            regionCode: ""
        },
        timeZone: {
            offSet: ""
        }
    });

    const navigate: NavigateFunction = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Data submitted!");
        axios.post("/api/airport", newAirport)
            .then(response => console.log(response))
            //.then(() => fetchAllAirports())
            .then(error => console.log(error));

        navigate("/airport")
    }

    return (
        <div className={"add-airport-form-container"}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
            >
                <ArrowBackIcon
                    sx={{cursor: "pointer"}}
                    onClick={() => navigate(-1)}
                />
            </Box>
            <h3>Add A New Airport</h3>
            <AirportForm
                newAirport={newAirport}
                setNewAirport={setNewAirport}
                handleSubmit={handleSubmit}
                buttonLabel={"Add a new airport"}
                editable={true}
            />
        </div>
    )
}