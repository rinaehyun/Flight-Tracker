import './LoginPage.css';
import {TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {UserForLogin} from "../../types/auth/userType.ts";
import {ChangeEvent, FormEvent, useState} from "react";

type LoginPageProps = {
    login: (user : UserForLogin) => void;
}

export default function LoginPage({ login }: LoginPageProps) {

    const [user, setUser] = useState<UserForLogin>({
        username: '',
        password: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUser({username: '', password: ''})
        login(user);
    }

    return (
        <>
            <h3>Log in</h3>
            <form className={"login-form"} onSubmit={handleSubmit}>
                <TextField
                    required
                    name={"username"}
                    label={"Username"}
                    variant={"standard"}
                    color={"primary"}
                    sx={{width: "100%"}}
                    onChange={handleChange}
                    autoComplete={"off"}
                />
                <TextField
                    required
                    name={"password"}
                    label={"Password"}
                    variant={"standard"}
                    color={"primary"}
                    sx={{width: "100%"}}
                    onChange={handleChange}
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