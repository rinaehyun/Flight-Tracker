import './UserForm.css';
import Notification from "../Notification/Notification.tsx";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import {TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {useNotificationTimer} from "../../hooks/useNotificationTimer.ts";

type UserFormProps = {
    showNotification: boolean,
    setShowNotification: Dispatch<SetStateAction<boolean>>,
    notificationMessage: string,
    pageName: string,
    formType: "login" | "signup",
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    buttonLabel: string,
    linkMessage: string,
    linkTo: string,
    linkLabel: string,
}

export default function UserForm({ showNotification, setShowNotification, notificationMessage,
                                     pageName, formType, handleSubmit, handleChange,
                                     buttonLabel, linkMessage, linkTo, linkLabel }: UserFormProps) {

    useNotificationTimer(showNotification, setShowNotification);

    return(
        <>
            {showNotification &&
                <Notification
                    setShowNotification={setShowNotification}
                    message={notificationMessage}
                    messageType={"error"}
                />
            }
            <h3>{pageName}</h3>
            <form className={"user-form"} onSubmit={handleSubmit}>
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
                {formType === "signup" &&
                    <>
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
                    </>
                }
                <button
                    type={"submit"}
                    className={"user-form-submit"}
                >{buttonLabel}
                </button>
                <p style={{fontSize: "12px", marginTop: "30px"}}>{linkMessage}
                    <Link
                        to={linkTo}
                        style={{fontSize: "12px", color: "blue"}}
                    > {linkLabel}</Link>
                </p>
            </form>
        </>
    )
}