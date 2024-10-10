import './EditAirlinePage.css';
import {Box} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AirlineForm from "../../../components/AirlineForm/AirlineForm.tsx";
import {NewAirline} from "../../../types/model/dataType.ts";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export default function EditAirlinePage() {
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
    console.log(params);
    const id: string | undefined = params.id;

    const fetchAirline = () => {
        axios.get(`/api/airline/${id}`)
            .then(response => {
                console.log(response)
                setUpdatedAirline(response.data);
                setOriginalAirline(response.data);
            })
            .catch(error => console.error(error.response.data));
    }

    useEffect(() => {
        fetchAirline();
    }, [])

    const onEdit = () => {
        setUpdatedAirline(originalAirline);
    }

    const updateAirline = (id: string, airline: NewAirline) => {
        axios.put(`/api/airline/${id}`, airline)
            .then(response => {
                if (response.status === 200) {
                    console.log("Airline data is updated!");
                }
            })
            .catch(error => console.error(error.response.data));
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id) updateAirline(id, updatedAirline);
    }

    return (
        <div className={"airline-edit-page"}>
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
                <button onClick={onEdit}>Edit</button>g
            </div>
            <h3>Edit Airline</h3>
            <AirlineForm
                newAirline={updatedAirline}
                setNewAirline={setUpdatedAirline}
                handleSubmit={handleSubmit}
                buttonLabel={'Edit Airline'}
            />
        </div>
    )
}