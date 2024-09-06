import {useNavigate} from "react-router-dom";
import axios from "axios";

type LoginPageProps = {
    setCurrentUser: (data: string) => void,
}

export default function LoginPage({ setCurrentUser }: LoginPageProps) {
    const navigate = useNavigate();

    const handleLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

        window.open(host + '/oauth2/authorization/github', '_self');

        axios.get("/api/auth/user")
            .then(response => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
        navigate("/flight");
    }

    return(
        <button onClick={handleLogin}>Log in with Github</button>
    )
}