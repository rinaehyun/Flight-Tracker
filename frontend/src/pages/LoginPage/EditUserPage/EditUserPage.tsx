import UserForm from "../../../components/UserForm/UserForm.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, SelectChangeEvent} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {FetchedUser, UserRole} from "../../../types/auth/userType.ts";
import axios from "axios";
import {useNotificationTimer} from "../../../hooks/useNotificationTimer.ts";

export default function EditUserPage() {
    const [editable, setEditable ] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [updatedUser, setUpdatedUser] = useState<FetchedUser>({
        username: "",
        password: "",
        role: "USER"
    });
    const [originalUser, setOriginalUser] = useState<FetchedUser>({
        username: "",
        password: "",
        role: "USER"
    });

    const navigate = useNavigate();
    const params = useParams();
    const id: string | undefined = params.id;

    const fetchUser = () => {
        axios.get(`/api/user/${id}`)
            .then(response => {
                console.log('Fetched user:', response.data);
                setUpdatedUser(response.data); // This will trigger a re-render
                setOriginalUser(response.data);
            })
            .catch(error => console.log(error.response.data))
    }

    useEffect(() => {
        fetchUser();
    }, [id])

    useEffect(() => {
        console.log('updatedUser changed:', updatedUser);
    }, [updatedUser]);

    const onEdit = () => {
        if (editable) {
            setUpdatedUser(originalUser);
        }
        setEditable(!editable)
    }

/*    const updateUser = (user: NewBasicUser) => {
        axios.put(`/api/user/{id}`, user)
            .then(response => {
                if (response.status === 200) {
                    setShowNotification(true);
                }
            })
            .catch(error => console.log(error.response.data))
    }*/

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |
        ChangeEvent<HTMLSelectElement> | SelectChangeEvent<UserRole>) => {
        const { name, value } = event.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    }

    const handleEditAccount = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //if (id) updateUser(updatedUser);
        setEditable(false);
    }

    useNotificationTimer(showNotification, setShowNotification);

    return (
        <div className={"edit-account-page"}>
            <div className={"top-buttons"}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    <ArrowBackIcon
                        sx={{cursor: "pointer"}}
                        onClick={() => navigate(-1)}
                    />
                </Box>
                <button onClick={onEdit}>{editable ? "Cancel Edit" : "Edit"}</button>
            </div>
            <UserForm
                user={updatedUser}
                showNotification={showNotification}
                setShowNotification={setShowNotification}
                notificationMessage={"The passwords do not match."}
                pageName={"Edit Account"}
                formType={"edit"}
                handleSubmit={handleEditAccount}
                handleChange={handleChange}
                buttonLabel={"Update"}
                editable={editable}
            />
        </div>
    )
}