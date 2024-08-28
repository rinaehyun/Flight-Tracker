import './Header.css'
import {Link} from "react-router-dom";

export default function Header() {
    return(
        <header>
            <Link to={"/"}>Logo</Link>
        </header>
    )
}