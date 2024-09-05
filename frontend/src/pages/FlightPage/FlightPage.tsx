import './FlightPage.css';
import {Flight} from "../../types/model/dataType.ts";
import FlightList from "./components/FlightList/FlightList.tsx";
import FlightFilter from "./components/FlightFilter/FlightFilter.tsx";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Box} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Filter} from "../../types/enum.ts";

type FlightPageProps = {
    data: Flight[],
    fetchAllFlights: () => void
}

export default function FlightPage({ data, fetchAllFlights }: Readonly<FlightPageProps>) {
    const [selectedFilter, setSelectedFilter] = useState<Filter>({airline: undefined});

    const navigate: NavigateFunction = useNavigate();

    const handleClick = () => {
        navigate('/flight/add');
    }

    const filteredFlightData = data
        .filter(flight => selectedFilter.airline ? flight.airline === selectedFilter.airline : flight);

    return (
        <div className={"flight-page"}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '10px',
                    bgcolor: 'none',
                    borderRadius: 1,
                }}
            >
                <AddCircleIcon
                    sx={{ fontSize: "35px", cursor: "pointer" }}
                    onClick={handleClick}
                />
            </Box>
            <FlightFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            <FlightList data={filteredFlightData} fetchAllFlights={fetchAllFlights} />
        </div>
    )
}