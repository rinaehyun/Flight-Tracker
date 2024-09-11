import {Navigate, Outlet} from "react-router-dom";
import {UserForLogin} from "../types/auth/userType.ts";

type ProtectedRoutes = {
    user: UserForLogin | null | undefined;
}

export default function ProtectedRoutes({ user }: ProtectedRoutes) {
    return user?.username ? <Outlet /> : <Navigate to={"/login"} />
}