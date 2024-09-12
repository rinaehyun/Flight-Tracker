import './Header.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {Link, useNavigate} from "react-router-dom";

type HeaderProps = {
    userId: string | undefined,
    logout: () => void,
}
export default function Header({ userId, logout }: Readonly<HeaderProps>) {
    const navigate = useNavigate();

    return(
        <header>
            <FlightTakeoffIcon
                sx={{fontSize: "25px", marginLeft: "20px", cursor: "pointer"}}
                onClick={() => window.location.href = '/'}
            />
            <nav>
                <ul className={"nav-ul"}>
                    <li className={"nav-li"}>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className={"nav-li"}>
                        <Link to={"/flight"}>Flight</Link>
                    </li>
                    <li className={"nav-li"}>
                        <Link to={"/airport"}>Airport</Link>
                    </li>
                    <li className={"nav-li"}>
                        <Link to={"/airline"}>Airline</Link>
                    </li>
                </ul>
            </nav>
            <div style={{float: "right", marginLeft: "auto"}}>
                {
                    userId
                        ? <button className={"login-button"} onClick={logout}>Log out</button>
                        : <button className={"login-button"} onClick={() => navigate('/login')}>Log in</button>
                }
            </div>
        </header>
    )
}