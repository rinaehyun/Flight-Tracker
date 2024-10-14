import './EditAirlinePage.css';
import {Box} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AirlineForm from "../../../components/AirlineForm/AirlineForm.tsx";
import {NewAirline} from "../../../types/model/dataType.ts";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Notification from "../../../components/Notification/Notification.tsx";
import {useNotificationTimer} from "../../../hooks/useNotificationTimer.ts";

export default function EditAirlinePage() {
    const [editable, setEditable ] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [originalAirline, setOriginalAirline] = useState<NewAirline>({
        iataCode: "",
        businessName: "",
        commonName: ""
    });

    const [updatedAirline, setUpdatedAirline] = useState<NewAirline>({
        iataCode: "",
        businessName: "",
        commonName: ""
    });

    const navigate = useNavigate();
    const params = useParams();
    const id: string | undefined = params.id;

    const fetchAirline = () => {
        axios.get(`/api/airline/${id}`)
            .then(response => {
                setUpdatedAirline(response.data);
                setOriginalAirline(response.data);
            })
            .catch(error => console.error(error.response.data));
    }

    useEffect(() => {
        fetchAirline();
    }, [])

    const onEdit = () => {
        if (id) {
            setUpdatedAirline(originalAirline);
        }
        setEditable(!editable);
    }

    const updateAirline = (id: string, airline: NewAirline) => {
        axios.put(`/api/airline/${id}`, airline)
            .then(response => {
                if (response.status === 200) {
                    setShowNotification(true);
                    setTimeout(() => {
                        setShowNotification(false);
                        navigate("/airline");
                    }, 4000);
                }
            })
            .catch(error => console.error(error.response.data));
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id) updateAirline(id, updatedAirline);
        setEditable(false);
    }

    useNotificationTimer(showNotification, setShowNotification);

    return (
        <div className={"airline-edit-page"}>
            {showNotification &&
                <Notification
                    setShowNotification={setShowNotification}
                    message={"Airline data has been updated."}
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
                        sx={{cursor: "pointer"}}
                        onClick={() => navigate(-1)}
                    />
                </Box>
                <button onClick={onEdit}>{editable ? "Cancel Edit" : "Edit"}</button>
            </div>
            <h3>Edit Airline</h3>
            <AirlineForm
                newAirline={updatedAirline}
                setNewAirline={setUpdatedAirline}
                handleSubmit={handleSubmit}
                buttonLabel={'Edit Airline'}
                editable={editable}
            />
        </div>
    )
}