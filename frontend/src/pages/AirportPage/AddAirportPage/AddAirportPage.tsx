import {Box} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NavigateFunction, useNavigate} from "react-router-dom";
import AirportForm from "../../../components/AirportForm/AirportForm.tsx";
import {useState} from "react";
import {NewAirport} from "../../../types/model/dataType.ts";

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

    return (
        <div className={"add-flight-form-container"}>
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
                buttonLabel={"Add a new airport"}
            />
        </div>
    )
}