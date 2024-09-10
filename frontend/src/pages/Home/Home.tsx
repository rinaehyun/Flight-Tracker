import {Link} from "react-router-dom";
import axios from "axios";

export default function WelcomePage() {
    const loadUser = () => {
        axios.get("/api/auth/user")
            .then(response => console.log(response.data))
    }

    return(
        <>
            <h2>Welcome to Flight App!</h2>
            <Link to={"/login"}>Login with Github</Link>
            <button onClick={loadUser}>User Info</button>
        </>
    )
}