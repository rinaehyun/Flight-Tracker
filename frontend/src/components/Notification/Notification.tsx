import './Notification.css';
import {Alert, IconButton, Stack} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import CloseIcon from '@mui/icons-material/Close';

type NotificationProps = {
    setShowNotification: Dispatch<SetStateAction<boolean>>,
    message: string,
    messageType: "success" | "error"
}

export default function Notification({ setShowNotification, message, messageType }: Readonly<NotificationProps>) {
    return (
        <Stack className={"stack-alert"}>
            <Alert
                severity={messageType}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setShowNotification(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >{message}</Alert>
        </Stack>
    )
}