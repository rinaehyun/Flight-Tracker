import {UserForLogin} from "../../types/auth/userType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import UserForm from "../../components/UserForm/UserForm.tsx";

type LoginPageProps = {
    login: (user : UserForLogin) => void;
    setShowLoginNotification: Dispatch<SetStateAction<boolean>>;
    showLoginNotification: boolean;
}

export default function LoginPage({ login, setShowLoginNotification, showLoginNotification }: LoginPageProps) {
    const [user, setUser] = useState<UserForLogin>({
        username: '',
        password: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUser({username: '', password: ''})
        login(user);
    }

    return (
        <article>
            <UserForm
                showNotification={showLoginNotification}
                setShowNotification={setShowLoginNotification}
                notificationMessage={"The username and/or password are not found. Please check again."}
                pageName={"Login"}
                formType={"login"}
                handleSubmit={handleLogin}
                handleChange={handleChange}
                buttonLabel={"Log in"}
                linkMessage={"If you don't have account? "}
                linkTo={"/signup"}
                linkLabel={" Go to Signup page"}
            />
        </article>
    )
}