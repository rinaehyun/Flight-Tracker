import './UserForm.css';
import Notification from "../Notification/Notification.tsx";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {Link} from "react-router-dom";
import {useNotificationTimer} from "../../hooks/useNotificationTimer.ts";
import {UserRoleList} from "../../types/auth/userType.ts";
import {FlightStatus} from "../../types/enum.ts";
import {capitalizeFirstLetter} from "../../utils/funtioncs.ts";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type UserFormProps = {
    showNotification: boolean,
    setShowNotification: Dispatch<SetStateAction<boolean>>,
    notificationMessage: string,
    pageName: string,
    formType: "login" | "signup" | "edit",
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |
        ChangeEvent<HTMLSelectElement> | SelectChangeEvent<FlightStatus>) => void,
    buttonLabel: string,
    linkMessage?: string,
    linkTo?: string,
    linkLabel?: string,
    editable: boolean,
}

export default function UserForm({ showNotification, setShowNotification, notificationMessage,
                                     pageName, formType, handleSubmit, handleChange,
                                     buttonLabel, linkMessage, linkTo, linkLabel, editable }: Readonly<UserFormProps>) {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword(
        (show) => !show
    );
    const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation(
        (show) => !show
    ); // Separate handler


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
                    disabled={!editable}
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
                    disabled={!editable}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {formType !== "login" &&
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
                            disabled={!editable}
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordConfirmation}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormControl variant="standard" sx={{m: 1, width: "100%", margin: 0}}>
                            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                name={"role"}
                                onChange={handleChange}
                                label="User Role"
                                disabled={!editable}
                                style={{textAlign: "left"}}
                            >
                                {UserRoleList.map((role) => (
                                    <MenuItem key={role} value={role}>{capitalizeFirstLetter(role)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>
                }
                <button
                    type={"submit"}
                    className={"user-form-submit"}
                    disabled={!editable}
                >{buttonLabel}
                </button>
                <p style={{fontSize: "12px", marginTop: "30px"}}>{linkMessage}
                    {
                        linkTo &&
                        <Link
                            to={linkTo}
                            style={{fontSize: "12px", color: "blue"}}
                        > {linkLabel}</Link>
                    }
                </p>
            </form>
        </>
    )
}