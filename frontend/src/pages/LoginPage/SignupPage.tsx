import {Link, useNavigate} from "react-router-dom";
import {TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {NewBasicUser} from "../../types/auth/userType.ts";
import axios from "axios";
import Notification from "../../components/Notification/Notification.tsx";

export default function SignupPage() {
    const [newUser, setNewUser] = useState<NewBasicUser>({
        username: '',
        password: '',
        passwordConfirmation: '',
        role: ''
    });
    const [showNotification, setShowNotification] = useState<boolean>(false);

    const navitate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    }

    const handleRegister = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newUser.password !== newUser.passwordConfirmation) {
            setShowNotification(true);
            return;
        }

        axios.post("/api/user/register", newUser)
            .then(response => {
                console.log(response)
                navitate("/login");
            })
            .then(error => console.log(error));
    }

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    return(
        <article className={"signup-page"}>
            {showNotification &&
                <Notification
                    setShowNotification={setShowNotification}
                    message={"The passwords do not match."}
                    messageType={"error"}
                />}
            <h3>Create an Account</h3>
            <form className={"login-form"} onSubmit={handleRegister}>
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
                <TextField
                    required
                    name={"passwordConfirmation"}
                    label={"Password Confirmation"}
                    variant={"standard"}
                    color={"primary"}
                    sx={{width: "100%"}}
                    onChange={handleChange}
                    autoComplete={"off"}
                    type={"password"}
                />
                <TextField
                    required
                    name={"role"}
                    label={"Role"}
                    variant={"standard"}
                    color={"primary"}
                    sx={{width: "100%"}}
                    onChange={handleChange}
                    autoComplete={"off"}
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
        </article>
    )
}