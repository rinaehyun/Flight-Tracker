import {Link} from "react-router-dom";
import {TextField} from "@mui/material";

export default function SignupPage() {

    return(
        <>
            <h3>Create an Account</h3>
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
                <TextField
                    required
                    id={"outlined-basic"}
                    label={"Password Confirmation"}
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
                >Sign up
                </button>
                <p style={{fontSize: "12px", marginTop: "30px"}}>Already have an account?
                    <Link
                        to={"/login"}
                        style={{fontSize: "12px", color: "blue"}}
                    > Go to Login page</Link>
                </p>
            </form>
        </>
    )
}