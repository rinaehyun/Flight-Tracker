import './FlightList.css'
import {Flight} from "../../../types/model/dataType.ts";
import {Airline} from "../../../types/enum.ts";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {capitalizeFirstLetter} from "../../../utils/funtioncs.ts";
import {calculateDuration, formatDate, formatTime} from "../../../utils/functionsForTime.ts";

type FlightListProps = {
    data: Flight[]
}

export default function FlightList({ data }: Readonly<FlightListProps>) {

    return(
        <div>
            {data.map(flight => (
                <div key={flight.id} className={"flight-card"}>
                    <div className={"flight-card-airline"}>
                        <FlightTakeoffIcon sx={{ fontSize: "25px"}}/>
                        <h4>{capitalizeFirstLetter(Airline[flight.airline as unknown as keyof typeof Airline])}</h4>
                        <h4>{flight.flightCode}</h4>
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