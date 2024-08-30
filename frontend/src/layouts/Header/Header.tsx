import './Header.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {Link} from "react-router-dom";

export default function Header() {

    return(
        <header>
            <FlightTakeoffIcon
                sx={{fontSize: "35px"}}
                onClick={() => window.location.href = '/'}
                style={{marginLeft: "20px", cursor: "pointer"}}
            />
            <nav>
                <ul className={"nav-ul"}>
                    <li className={"nav-li"}>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className={"nav-li"}>
                        <Link to={"/flight"}>Flight</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}