import {Flight} from "../../types/model/dataType.ts";

type FlightPageProps = {
    data: Flight[]
}

export default function FlightPage({ data }: FlightPageProps) {

    return (
        <>
            <h3>This is a tracking page.</h3>
            {data.map(flight => (
                <div key={flight.id}>
                    <p>{flight.flightCode}</p>
                    <p>{flight.airline}</p>
                    <p>{flight.origin}</p>
                    <p>{flight.destination}</p>
                    <p>{flight.aircraftType}</p>
                    <p>{flight.flightStatus}</p>
                </div>
            ))}
        </>
    )
}