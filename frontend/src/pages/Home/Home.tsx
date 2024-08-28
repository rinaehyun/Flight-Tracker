import {Link} from "react-router-dom";

export default function WelcomePage() {
    return(
        <>
            <h4>Welcome to Flight Tracker!</h4>
            <Link to={"/tracking"}>Login</Link>
        </>
    )
}