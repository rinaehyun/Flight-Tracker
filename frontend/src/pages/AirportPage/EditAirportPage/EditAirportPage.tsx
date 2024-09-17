import './EditAirportPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {FormEvent, useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import AirportForm from "../../../components/AirportForm/AirportForm.tsx";
import Notification from "../../../components/Notification/Notification.tsx";
import {NewAirport} from "../../../types/model/dataType.ts";
import {useNotificationTimer} from "../../../hooks/useNotificationTimer.ts";
import axios from "axios";

export default function EditAirportPage() {
    const [editable, setEditable ] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [updatedAirport, setUpdatedAirport] = useState<NewAirport>({
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

    const [originalAirport, setOriginalAirport] = useState<NewAirport>({
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

    const navigate = useNavigate();
    const params = useParams();
    const id: string | undefined = params.id;

    const fetchAirport = () => {
        axios.get(`/api/airport/${id}`)
            .then(response => {
                setUpdatedAirport(response.data);
                setOriginalAirport(response.data);
            })
            .catch(error => console.log(error.response.data))
    }

    useEffect(() => {
        fetchAirport();
    }, [id])


    const onEdit = () => {
        if (editable) {
            setUpdatedAirport(originalAirport);
        }
        setEditable(!editable)
    }

    const updateAirport = (id: string, airport: NewAirport) => {
        axios.put(`/api/airport/${id}`, airport)
            .then(response => {
                if (response.status === 200) {
                    //fetchAllFlights();
                    setShowNotification(true);
                }
            })
            .catch(error => console.log(error.response.data))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id) updateAirport(id, updatedAirport);
        setEditable(false);
    }

    useNotificationTimer(showNotification, setShowNotification);

    return (
        <div className={"airport-edit-page"}>
            {showNotification &&
                <Notification
                    setShowNotification={setShowNotification}
                    message={"Airport data has been updated."}
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
            <h3>Edit Airport</h3>
            <AirportForm
                newAirport={updatedAirport}
                setNewAirport={setUpdatedAirport}
                handleSubmit={handleSubmit}
                buttonLabel={"Edit Airport"}
                editable={editable}
            />
        </div>
    )
}