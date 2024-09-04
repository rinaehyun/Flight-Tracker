import {Link} from "react-router-dom";

export default function WelcomePage() {

    const login = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

        window.open(host + '/oauth2/authorization/github', '_self');
    }

    return(
        <>
            <h2>Welcome to Flight App!</h2>
            <Link to={"/flight"} onClick={login}>Login with Github</Link>
        </>
    )
}