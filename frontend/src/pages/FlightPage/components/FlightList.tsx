import './FlightList.css'
import {Flight} from "../../../types/model/dataType.ts";
import {Airline} from "../../../types/enum.ts";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DeleteIcon from '@mui/icons-material/Delete';
import {capitalizeFirstLetter} from "../../../utils/funtioncs.ts";
import {calculateDuration, formatDate, formatTime} from "../../../utils/functionsForTime.ts";
import axios from "axios";

type FlightListProps = {
    data: Flight[],
    fetchAllFlights: () => void
}

export default function FlightList({ data, fetchAllFlights }: Readonly<FlightListProps>) {
    const handleDeleteFlight = (id: string): void => {
        axios.delete('/api/flight/' + id)
            .then(response => {
                if (response.status === 200) {
                    fetchAllFlights();
                    console.log('Flight deleted successfully');
                }
            })
            .catch(error => console.log(error.message));
    }

    return(
        <div>
            {data.map(flight => (
                <div key={flight.id} className={"flight-card"}>
                    <div className={"flight-card-headline"}>
                        <div className={"flight-card-airline"}>
                            <FlightTakeoffIcon sx={{ fontSize: "25px" }}/>
                            <h4>{capitalizeFirstLetter(Airline[flight.airline as unknown as keyof typeof Airline])}</h4>
                            <h4>{flight.flightCode}</h4>
                        </div>
                        <DeleteIcon sx={{ marginRight: '15px', cursor: "pointer" }} onClick={() => handleDeleteFlight(flight.id)} />
                    </div>
                    <div className={"flight-card-detail"}>
                        <div className={"flight-origin"}>
                            <h3>{flight.origin}</h3>
                            <h5>{formatDate(flight.departureTime)}</h5>
                            <h5>{formatTime(flight.departureTime)}</h5>
                        </div>
                        <p style={{fontSize: "16px"}}>{calculateDuration(flight.departureTime, flight.arrivalTime)}</p>
                        <div className={"flight-destination"}>
                            <h3>{flight.destination}</h3>
                            <h5>{formatDate(flight.arrivalTime)}</h5>
                            <h5>{formatTime(flight.arrivalTime)}</h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}