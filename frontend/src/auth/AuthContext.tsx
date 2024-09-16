import {createContext} from "react";
import {User} from "../types/auth/userType.ts";

type AuthContextType = {
    user: User | null | undefined,
}

export const AuthContext = createContext<AuthContextType>({
    user: undefined
})