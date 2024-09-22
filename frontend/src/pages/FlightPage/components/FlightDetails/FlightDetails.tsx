import './FlightDetails.css';
import {Airport, Flight} from "../../../../types/model/dataType.ts";
import axios from "axios";
import {useEffect, useState} from "react";
import {capitalizeFirstLetter} from "../../../../utils/funtioncs.ts";

type FlightDetailsProps = {
    flight: Flight
}

export default function FlightDetails({ flight }: Readonly<FlightDetailsProps>) {
    const [originAirport, setOriginAirport] = useState<Airport>();
    const [destinationAirport, setDestinationAirport] = useState<Airport>();

    const fetchOriginAirport = () => {
        axios.get(`/api/airport/iata/${flight.origin}`)
            .then(response => {
                setOriginAirport(response.data);
                console.log(response.data)
            })
            .catch(error => console.log(error.response.data))
    }

    useEffect(() => {
        fetchOriginAirport();
    }, [flight.origin])

    const fetchDestinationAirport = () => {
        axios.get(`/api/airport/iata/${flight.destination}`)
            .then(response => {
                setDestinationAirport(response.data);
                console.log(response.data)
            })
            .catch(error => console.log(error.response.data))
    }

    useEffect(() => {
        fetchDestinationAirport();
    }, [flight.destination])

    console.log(originAirport)
    console.log(destinationAirport)
    return (
        <section>
            <hr style={{border: '1px dotted #D3D3D3', width: '95%'}}/>
            <div className={"flight-detail-airports"}>
                <div className={"flight-detail"}>
                    <h6 className={"flight-detail-title"}>Departure Info</h6>
                    <h6 className={"flight-detail-info"}>{capitalizeFirstLetter(originAirport?.name)}, {capitalizeFirstLetter(originAirport?.address.countryName)}</h6>
                    <h6 className={"flight-detail-info"}>UTC {originAirport?.timeZone.offSet}</h6>
                </div>
                <div className={"flight-detail"}>
                    <h6 className={"flight-detail-title-right"}>Arrival Info</h6>
                    <h6 className={"flight-detail-info-right"}>{capitalizeFirstLetter(destinationAirport?.name)}, {capitalizeFirstLetter(destinationAirport?.address.countryName)}</h6>
                    <h6 className={"flight-detail-info-right"}>UTC {destinationAirport?.timeZone.offSet}</h6>
                </div>
            </div>
            <div className={"flight-detail-section"}>
            <div className={"flight-detail"}>
                    <h6 className={"flight-detail-title"}>Flight Code</h6>
                    <h6 className={"flight-detail-info"}>{flight.flightCode}</h6>
                </div>
                <div className={"flight-detail"}>
                    <h6 className={"flight-detail-title"}>Aircraft Type</h6>
                    <h6 className={"flight-detail-info"}>{flight.aircraftType}</h6>
                </div>
                <div className={"flight-detail"}>
                    <h6 className={"flight-detail-title"}>Flight Status</h6>
                    <h6 className={"flight-detail-info"}>{flight.flightStatus}</h6>
                </div>
            </div>
        </section>

    )
}