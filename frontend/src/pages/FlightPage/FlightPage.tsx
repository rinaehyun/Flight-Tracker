import './FlightPage.css';
import {Flight} from "../../types/model/dataType.ts";
import FlightList from "./components/FlightList/FlightList.tsx";
import FlightFilter from "./components/FlightFilter/FlightFilter.tsx";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Filter} from "../../types/enum.ts";
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";

type FlightPageProps = {
    data: Flight[],
    loggedInUser: BasicUser | null | undefined
}

export default function FlightPage({ data, loggedInUser }: Readonly<FlightPageProps> ) {
    const [flightData, setFlightData] = useState<Flight[]>(data);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState<Filter>({
        airline: undefined,
        origin: undefined,
        destination: undefined
    });

    const navigate = useNavigate();

    const fetchAllFlights = () => {
        axios.get("/api/flight")
            .then(response=> {
                setFlightData(response.data)
            })
            .catch(error => alert(error));
    }

    useEffect(() => {
        fetchAllFlights();
    },[data])

    const handleClick = () => {
        navigate("/flight/add");
    }

    const filteredFlightData = flightData
        .filter(flight => selectedFilter.airline ? flight.airline === selectedFilter.airline : flight)
        .filter(flight => selectedFilter.origin ? flight.origin === selectedFilter.origin : flight)
        .filter(flight => selectedFilter.destination ? flight.destination === selectedFilter.destination : flight);

    return (
        <div className={"flight-page"}>
            <h3>Flight Information</h3>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '10px',
                    bgcolor: 'none',
                    borderRadius: 1,
                }}
            >
                {loggedInUser?.role != "USER" &&
                    <button onClick={handleClick} style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "1px",
                        fontSize: "0.7em"
                    }}>{"Add"}</button>
                }
            </Box>
            <article style={{border: "1px solid #523d35", borderRadius: "2px", alignContent: "center"}}>
                <button onClick={() => setShowFilter(!showFilter)}
                        className={"show-filter-btn"}>{!showFilter ? 'Show Filters' : 'Close Filters'}</button>
                {showFilter && <FlightFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>}
            </article>
            {filteredFlightData.length == 0 ? <h5>No Flights found</h5> :
                <FlightList data={filteredFlightData} fetchAllFlights={fetchAllFlights} loggedInUser={loggedInUser} />}
        </div>
    )
}