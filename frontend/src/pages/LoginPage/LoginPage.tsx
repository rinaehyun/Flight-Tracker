import './LoginPage.css';
import {TextField} from "@mui/material";
import {Link} from "react-router-dom";

export default function LoginPage() {

    const handleLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

        window.open(host + '/oauth2/authorization/github', '_self');

        //navigate("/flight");
    }

    return (
        <>
            <h3>Log in</h3>
            <form className={"login-form"} onSubmit={() => {}}>
                <TextField
                    required
                    id={"outlined-basic"}
                    label={"Username"}
                    variant={"standard"}
                    color={"primary"}
                    sx={{width: "100%"}}
                    onChange={() => {
                    }}
                    autoComplete={"off"}
                />
                <TextField
                    required
                    id={"outlined-basic"}
                    label={"Password"}
                    variant={"standard"}
                    color={"primary"}
                    sx={{width: "100%"}}
                    onChange={() => {
                    }}
                    autoComplete={"off"}
                    type={"password"}
                />
                <button
                    type={"submit"}
                    className={"login-form-submit"}
                >Log in
                </button>
                <p style={{fontSize: "12px", marginTop: "30px"}}>Log in with a github account?
                    <Link
                        to={"/flight"}
                        style={{fontSize: "12px", color: "blue"}}
                        onClick={handleLogin}
                    > Github</Link>
                </p>
            </form>
        </>
    )
}