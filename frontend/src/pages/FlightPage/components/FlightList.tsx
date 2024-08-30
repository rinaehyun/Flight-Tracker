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
                        <p>{capitalizeFirstLetter(Airline[flight.airline as unknown as keyof typeof Airline])}</p>
                        <p>{flight.flightCode}</p>
                    </div>
                    <div className={"flight-card-detail"}>
                        <div className={"flight-origin"}>
                            <p style={{fontSize: "20px"}}>{flight.origin}</p>
                            <p style={{fontSize: "15px"}}>{formatDate(flight.departureTime)}</p>
                            <p style={{fontSize: "15px"}}>{formatTime(flight.departureTime)}</p>
                        </div>
                        <p style={{fontSize: "16px"}}>{calculateDuration(flight.departureTime, flight.arrivalTime)}</p>
                        <div className={"flight-destination"}>
                            <p style={{fontSize: "20px"}}>{flight.destination}</p>
                            <p style={{fontSize: "15px"}}>{formatDate(flight.arrivalTime)}</p>
                            <p style={{fontSize: "15px"}}>{formatTime(flight.arrivalTime)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}