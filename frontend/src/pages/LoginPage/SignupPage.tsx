import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {NewBasicUser} from "../../types/auth/userType.ts";
import axios from "axios";
import UserForm from "../../components/UserForm/UserForm.tsx";

export default function SignupPage() {
    const [newUser, setNewUser] = useState<NewBasicUser>({
        username: '',
        password: '',
        passwordConfirmation: '',
        role: ''
    });
    const [showNotification, setShowNotification] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    }

    const handleRegister = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event)
        if (newUser.password !== newUser.passwordConfirmation) {
            setShowNotification(true);
            return;
        }

        axios.post("/api/auth/register", newUser)
            .then(response => {
                console.log(response)
                navigate("/login");
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
            <UserForm
                showNotification={showNotification}
                setShowNotification={setShowNotification}
                pageName={"Create an Account"}
                formType={"signup"}
                handleSubmit={handleRegister}
                handleChange={handleChange}
                buttonLabel={"Sign up"}
                linkMessage={"Already have an account? "}
                linkTo={"/login"}
                linkLabel={" Go to Login page"}
            />
        </article>
    )
}