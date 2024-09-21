import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {NewBasicUser, UserRole} from "../../types/auth/userType.ts";
import axios from "axios";
import UserForm from "../../components/UserForm/UserForm.tsx";
import {SelectChangeEvent} from "@mui/material";
import Notification from "../../components/Notification/Notification.tsx";
import {useNotificationTimer} from "../../hooks/useNotificationTimer.ts";

export default function SignupPage() {
    const [newUser, setNewUser] = useState<NewBasicUser>({
        username: '',
        password: '',
        passwordConfirmation: '',
        role: "USER"
    });
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [showUserAlreadyExistsNotification, setShowUserAlreadyExistsNotification] = useState<boolean>(false);
    const [showUserCreatedNotification, setShowUserCreatedNotification] = useState<boolean>(false);


    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |
        ChangeEvent<HTMLSelectElement> | SelectChangeEvent<UserRole>) => {
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
                setShowUserCreatedNotification(true);
                setTimeout(() => {
                    navigate("/login");
                }, 3000)
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    console.error("User already exists:", error.response.data.error);
                    setShowUserAlreadyExistsNotification(true);
                } else {
                    console.error("An error occurred:", error);
                }
            });
    }

    useNotificationTimer(showUserAlreadyExistsNotification, setShowUserAlreadyExistsNotification);

    useNotificationTimer(showUserCreatedNotification, setShowUserCreatedNotification);

    return(
        <div className={"signup-page"}>
            {showUserAlreadyExistsNotification && <Notification
                setShowNotification={setShowUserAlreadyExistsNotification}
                message={`The username already exists. Please try with another username.`}
                messageType={"error"}
            />}
            {showUserCreatedNotification &&
                <Notification
                    setShowNotification={setShowUserCreatedNotification}
                    message={`Your account with ${newUser.username} has been created!`}
                    messageType={"success"}
                />
            }
            <UserForm
                user={newUser}
                showNotification={showNotification}
                setShowNotification={setShowNotification}
                notificationMessage={"The passwords do not match."}
                pageName={"Create an Account"}
                formType={"signup"}
                handleSubmit={handleRegister}
                handleChange={handleChange}
                buttonLabel={"Sign up"}
                linkMessage={"Already have an account? "}
                linkTo={"/login"}
                linkLabel={" Go to Login page"}
                editable={true}
            />
        </div>
    )
}