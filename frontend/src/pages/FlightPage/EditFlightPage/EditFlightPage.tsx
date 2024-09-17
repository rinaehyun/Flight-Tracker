import './EditFlightPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {NewFlight} from "../../../types/model/dataType.ts";
import FlightForm from "../../../components/FlightForm/FlightForm.tsx";
import axios from "axios";
import Notification from "../../../components/Notification/Notification.tsx";
import {useNotificationTimer} from "../../../hooks/useNotificationTimer.ts";

type FlightDetailPageProps = {
    fetchAllFlights: () => void,
}

export default function EditFlightPage({ fetchAllFlights }: Readonly<FlightDetailPageProps>) {
    const [editable, setEditable ] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);

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

    const [originalFlight, setOriginalFlight] = useState<NewFlight>({
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
    const params = useParams();
    const id: string | undefined = params.id;

    const fetchFlight = () => {
        axios.get(`/api/flight/${id}`)
            .then(response => {
                setNewFlight(response.data);
                setOriginalFlight(response.data);
            })
            .catch(error => console.log(error.response.data))
    }

    useEffect(() => {
        fetchFlight();
    }, [id])


    const onEdit = () => {
        if (editable) {
            setNewFlight(originalFlight);
        }
        setEditable(!editable)
    }

    const updateFlight = (id: string, flight: NewFlight) => {
        axios.put(`/api/flight/${id}`, flight)
            .then(response => {
                if (response.status === 200) {
                    fetchAllFlights();
                    setShowNotification(true);
                }
            })
            .catch(error => console.log(error.response.data))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id) updateFlight(id, newFlight);
        setEditable(false);
    }

    useNotificationTimer(showNotification, setShowNotification);

    return (
        <div className={"flight-details-container"}>
            {showNotification &&
                <Notification
                    setShowNotification={setShowNotification}
                    message={"Flight data has been updated."}
                    messageType={"success"}
                />
            }
            <div className={"top-buttons"}>
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
                <button onClick={onEdit}>{editable ? "Cancel Edit" : "Edit"}</button>
            </div>
            <h3>Edit Flight</h3>
            <FlightForm
                newFlight={newFlight}
                setNewFlight={setNewFlight}
                handleSubmit={handleSubmit}
                buttonLabel={"Edit Flight"}
                editable={editable}
            />
        </div>
    )
}