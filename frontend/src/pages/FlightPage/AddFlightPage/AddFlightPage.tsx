import './AddFlightPage.css';
import FlightForm from "../../../components/FlightForm/FlightForm.tsx";
import {NewFlight} from "../../../types/model/dataType.ts";
import {FormEvent, useState} from "react";
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box} from "@mui/material";
import Notification from "../../../components/Notification/Notification.tsx";

type AddFlightPageProps = {
    fetchAllFlights: () => void
}

export default function AddFlightPage({ fetchAllFlights }: Readonly<AddFlightPageProps>) {
    const [showFlightCreatedNotification, setShowFlightCreatedNotification] = useState<boolean>(false);
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
            .then(() => {
                setShowFlightCreatedNotification(true);
            })
            .then(() => fetchAllFlights())
            .catch(error => console.log(error));

        setTimeout(() => {
            navigate("/flight");
        }, 3000);
    }

    return (
        <div className={"add-flight-form-container"}>
            {showFlightCreatedNotification && <Notification
                setShowNotification={setShowFlightCreatedNotification}
                message={`The flight ${newFlight.flightCode} has been created!`}
                messageType={"success"}
            />}
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
                buttonLabel="Add a new Flight"
                editable={true}
            />
        </div>
    )
}