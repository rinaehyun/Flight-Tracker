import './LoginPage.css';
import {UserForLogin} from "../../types/auth/userType.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
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

    useEffect(() => {
        if (showLoginNotification) {
            const timer = setTimeout(() => {
                setShowLoginNotification(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showLoginNotification]);

    return (
        <article>
            <UserForm
                showNotification={showLoginNotification}
                setShowNotification={setShowLoginNotification}
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