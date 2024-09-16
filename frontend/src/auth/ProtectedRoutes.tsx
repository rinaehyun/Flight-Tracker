import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutes = {
    userId: string | null | undefined;
}

export default function ProtectedRoutes({ userId }: ProtectedRoutes) {
    return userId ? <Outlet /> : <Navigate to={"/login"} />
}