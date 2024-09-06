import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

        window.open(host + '/oauth2/authorization/github', '_self');

        navigate("/flight");
    }

    return(
        <button onClick={handleLogin}>Log in with Github</button>
    )
}