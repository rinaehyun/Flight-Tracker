import {Flight} from "../../../../types/model/dataType.ts";

type FlightDetailsProps = {
    flight: Flight
}

export default function FlightDetails({ flight }: Readonly<FlightDetailsProps>) {
    console.log(flight);
    return (
        <>
            <p>Hello</p>
            <p>{flight.flightCode}</p>
        </>

    )
}