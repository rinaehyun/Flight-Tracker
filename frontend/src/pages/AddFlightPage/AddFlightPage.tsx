import FlightForm from "./components/FlightForm.tsx";
import {NewFlight} from "../../types/model/dataType.ts";
import {FormEvent, useState} from "react";
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";

type AddFlightPageProps = {
    fetchAllFlights: () => void
}

export default function AddFlightPage({ fetchAllFlights }: AddFlightPageProps) {
    const [newFlight, setNewFlight] = useState<NewFlight>({
        flightCode: "",
        airline: "",
        origin: "",
        destination: "",
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
        <>
            <h3>Add A New Flight</h3>
            <FlightForm
                newFlight={newFlight}
                setNewFlight={setNewFlight}
                handleSubmit={handleSubmit}
            />
        </>
    )
}