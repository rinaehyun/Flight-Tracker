import {Link} from "react-router-dom";

export default function WelcomePage() {

    return(
        <>
            <h2>Welcome to Flight App!</h2>
            <Link to={"/login"}>Login with Github</Link>
        </>
    )
}