import './FlightDetailPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {Alert, Box, IconButton, Stack} from "@mui/material";
import {NewFlight} from "../../types/model/dataType.ts";
import FlightForm from "../AddFlightPage/components/FlightForm.tsx";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

type FlightDetailPageProps = {
    fetchAllFlights: () => void,
}

export default function FlightDetailPage({ fetchAllFlights }: FlightDetailPageProps) {
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

    const navigate: NavigateFunction = useNavigate();
    const params = useParams();
    const id: string | undefined = params.id;

    const fetchFlight = () => {
        axios.get(`/api/flight/${id}`)
            .then(response => {
                console.log(response.data)
                setNewFlight(response.data)
            })
            .catch(error => console.log(error.response.data))
    }

    useEffect(() => {
        fetchFlight();
    }, [])

    const onEdit = () => {
        setEditable(!editable)
    }

    const updateFlight = (id: string, flight: NewFlight) => {
        console.log(flight)
        axios.put(`/api/flight/${id}`, flight)
            .then(response => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                response.status === 200 && fetchAllFlights();
                setShowNotification(true);
            })
            .catch(error => console.log(error.response.data))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id) updateFlight(id, newFlight)
        setEditable(false)
    }

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    return (
        <article className={"flight-details"}>
            {showNotification &&
                <Stack className={"stack-alert"}>
                   <Alert
                        severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setShowNotification(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >Flight Data has been updated.</Alert>
                </Stack>
            }

            <div className={"top-buttons"}>
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
                <button onClick={onEdit}>{editable ? "Cancel Edit" : "Edit"}</button>
            </div>
            <h3>Edit Flight</h3>
            <FlightForm
                newFlight={newFlight}
                setNewFlight={setNewFlight}
                handleSubmit={handleSubmit}
                buttonLabel="Edit Flight"
            />
        </article>
    )
}