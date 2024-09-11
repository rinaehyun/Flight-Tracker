import {Navigate, Outlet} from "react-router-dom";
import {BasicUser} from "../types/auth/userType.ts";

type ProtectedRoutes = {
    user: BasicUser | null | undefined;
}

export default function ProtectedRoutes({ user }: ProtectedRoutes) {
    return user?.id ? <Outlet /> : <Navigate to={"/login"} />
}