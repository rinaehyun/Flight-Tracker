import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import React, {Dispatch, SetStateAction} from "react";
import Logout from '@mui/icons-material/Logout';
import {BasicUser} from "../../../../types/auth/userType.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";

type AccountMenuProps = {
    loggedInUser: BasicUser | null | undefined,
    setLoggedInUser: Dispatch<SetStateAction<BasicUser | null | undefined>>,
}

export default function AccountMenu({ loggedInUser, setLoggedInUser }: Readonly<AccountMenuProps>) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        axios.post("/api/auth/logout")
            .then(() => navigate("/login"))
            .catch(error => console.error(error))
            .finally(() => setLoggedInUser(null));
    }

    return (
        <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2, marginRight: "10px" }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>{loggedInUser?.username.charAt(0).toUpperCase()}</Avatar>
                </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={() => navigate(`/user/${loggedInUser?.id}`)}>
                <Avatar /> Edit account
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
        </>
    )
}