import './FlightList.css'
import {Flight} from "../../../types/model/dataType.ts";
import {Airline} from "../../../types/enum.ts";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

type FlightListProps = {
    data: Flight[]
}

export default function FlightList({ data }: FlightListProps) {
    return(
        <div>
            {data.map(flight => (
                <div key={flight.id} className={"flight-card"}>
                    <div className={"flight-card-airline"}>
                        <FlightTakeoffIcon sx={{ fontSize: "25px"}}/>
                        <p>{Airline[flight.airline as unknown as keyof typeof Airline]}</p>
                        <p>{flight.flightCode}</p>
                    </div>
                    <div className={"flight-card-detail"}>
                        <p style={{fontSize: "20px"}}>{flight.origin}</p>
                        <p style={{fontSize: "16px"}}>13 hours</p>
                        <p style={{fontSize: "20px"}}>{flight.destination}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}