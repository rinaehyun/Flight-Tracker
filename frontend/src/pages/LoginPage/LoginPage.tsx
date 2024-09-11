import './LoginPage.css';
import {TextField} from "@mui/material";
import {Link} from "react-router-dom";

export default function LoginPage() {

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
                <p style={{fontSize: "12px", marginTop: "30px"}}>If you don't have account?
                    <Link
                        to={"/signup"}
                        style={{fontSize: "12px", color: "blue"}}
                    > Sign up</Link>
                </p>
            </form>
        </>
    )
}