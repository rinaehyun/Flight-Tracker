import AirlineForm from "../../../components/AirlineForm/AirlineForm.tsx";
import {FormEvent, useState} from "react";
import {NewAirline} from "../../../types/model/dataType.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Notification from "../../../components/Notification/Notification.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Box} from "@mui/material";
import {useNotificationTimer} from "../../../hooks/useNotificationTimer.ts";

export default function AddAirlinePage() {
    const [newAirline, setNewAirline] = useState<NewAirline>({
        iataCode: "",
        businessName: "",
        commonName: ""
    });
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [showAirlineAlreadyExistsNotification, setShowAirlineAlreadyExistsNotification] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(newAirline)
        axios.post("/api/airline", newAirline)
            .then(() => {
                setShowNotification(true);
                axios.get("/api/airline");

                setTimeout(() => {
                    setShowNotification(false);
                    navigate("/airline");
                }, 4000);
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    setShowAirlineAlreadyExistsNotification(true);
                } else {
                    console.error("An error occurred:", error);
                }
            })
    }

    useNotificationTimer(showAirlineAlreadyExistsNotification, setShowAirlineAlreadyExistsNotification);

    return(
        <div className={"add-airport-form-container"}>
            {showNotification && <Notification
                setShowNotification={setShowNotification}
                message={`Airline with IATA Code ${newAirline.iataCode} has been created.`}
                messageType={"success"}
            />}
            {showAirlineAlreadyExistsNotification && <Notification
                setShowNotification={setShowAirlineAlreadyExistsNotification}
                message={`Airline with IATA Code ${newAirline.iataCode} already exists.`}
                messageType={"error"}
            />}
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
            <h3>Add A New Airline</h3>
            <AirlineForm
                newAirline={newAirline}
                setNewAirline={setNewAirline}
                handleSubmit={handleSubmit}
                buttonLabel={"Add a new airline"}
            />
        </div>
    )
}