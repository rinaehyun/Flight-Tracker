import {Link} from "react-router-dom";
import axios from "axios";

export default function WelcomePage() {

    const login = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

        window.open(host + '/oauth2/authorization/github', '_self');
    }

    const loadUser = () => {
        axios.get("/api/auth/user")
            .then(response => console.log(response.data))
    }

    const logout = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

        window.open(host + '/logout', '_self')
    }

    return(
        <>
            <h2>Welcome to Flight App!</h2>
            <Link to={"/"} onClick={login}>Login with Github</Link>
            <button onClick={loadUser}>User Info</button>
            <button onClick={logout}>Logout</button>
        </>
    )
}