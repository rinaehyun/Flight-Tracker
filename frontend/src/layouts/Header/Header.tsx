import './Header.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

export default function Header() {

    return(
        <header>
            <FlightTakeoffIcon
                sx={{ fontSize: "25px"}}
                onClick={() => window.location.href='/'}
                style={{ marginLeft: "20px", cursor: "pointer"}}
            />
        </header>
    )
}