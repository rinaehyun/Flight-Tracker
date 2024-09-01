import './FlightPage.css';
import {Flight} from "../../types/model/dataType.ts";
import FlightList from "./components/FlightList.tsx";
import FlightFilter from "./components/FlightFilter.tsx";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Box} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";

type FlightPageProps = {
    data: Flight[]
}

export default function FlightPage({ data }: Readonly<FlightPageProps>) {

    const navigate: NavigateFunction = useNavigate();

    const handleClick = () => {
        navigate('/flight/add');
    }

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
            <FlightFilter />
            <FlightList data={data}/>
        </div>
    )
}