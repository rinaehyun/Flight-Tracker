import './Header.css'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {Link, useNavigate} from "react-router-dom";
import {BasicUser} from "../../types/auth/userType.ts";
import AccountMenu from "./components/UserMenu/AccountMenu.tsx";
import {Dispatch, SetStateAction} from "react";

type HeaderProps = {
    loggedInUser: BasicUser | null | undefined,
    setLoggedInUser: Dispatch<SetStateAction<BasicUser | null | undefined>>,
}

export default function Header({ loggedInUser, setLoggedInUser }: Readonly<HeaderProps>) {
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
                    loggedInUser?.id
                        ? <AccountMenu loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
                        : <button className={"login-button"} onClick={() => navigate('/login')}>Log in</button>
                }
            </div>
        </header>
    )
}