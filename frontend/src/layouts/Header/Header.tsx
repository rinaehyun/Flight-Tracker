import './Header.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {Link, useNavigate} from "react-router-dom";

type HeaderProps = {
    currentUser: string | undefined,
}
export default function Header({ currentUser }: HeaderProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

        window.open(host + '/logout', '_self')
    }

    return(
        <header>
            <FlightTakeoffIcon
                sx={{fontSize: "35px", marginLeft: "20px", cursor: "pointer"}}
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
                </ul>
            </nav>
            <div style={{ float: "right", marginLeft: "auto" }}>
                {
                    currentUser
                        ? <button onClick={handleLogout}>Log out</button>
                        : <button onClick={() => navigate('/login')}>Log in</button>
                }
            </div>
        </header>
    )
}