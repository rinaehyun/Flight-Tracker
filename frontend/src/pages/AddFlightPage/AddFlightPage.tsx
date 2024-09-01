import './AddFlightPage.css';
import FlightForm from "./components/FlightForm.tsx";
import {NewFlight} from "../../types/model/dataType.ts";
import {FormEvent, useState} from "react";
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box} from "@mui/material";

type AddFlightPageProps = {
    fetchAllFlights: () => void
}

export default function AddFlightPage({ fetchAllFlights }: Readonly<AddFlightPageProps>) {
    const [newFlight, setNewFlight] = useState<NewFlight>({
        flightCode: "",
        airline: "",
        origin: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
        aircraftType: "",
        flightStatus: "UNKNOWN"
    });

    const navigate: NavigateFunction = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Data submitted!");
        axios.post("/api/flight", newFlight)
            .then(response => console.log(response))
            .then(() => fetchAllFlights())
            .then(error => console.log(error));

        navigate("/flight")
    }

    return (
        <div className={"add-flight-form-container"}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
            >
                <ArrowBackIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                />
            </Box>
            <h3>Add A New Flight</h3>
            <FlightForm
                newFlight={newFlight}
                setNewFlight={setNewFlight}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}