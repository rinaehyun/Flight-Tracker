import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Header from "./layouts/Header/Header.tsx";
import Footer from "./layouts/Footer/Footer.tsx";
import FlightPage from "./pages/FlightPage/FlightPage.tsx";
import axios from 'axios';
import {useEffect, useState} from "react";
import {Flight} from "./types/model/dataType.ts";
import AddFlightPage from "./pages/AddFlightPage/AddFlightPage.tsx";
import FlightDetailPage from "./pages/FlightDetailPage/FlightDetailPage.tsx";
import {BasicUser} from "./types/auth/userType.ts";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignupPage from "./pages/LoginPage/SignupPage.tsx";
import AirportPage from "./pages/AirportPage/AirportPage.tsx";
import AirlinePage from "./pages/AirlinePage/AirlinePage.tsx";
import ProtectedRoutes from "./auth/ProtectedRoutes.tsx";

function App() {
    const [flightData, setFlightData] = useState<Flight[]>([]);
    const [currentUser, setCurrentUser] = useState<BasicUser | null | undefined>({
        id: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        role: ''
    });

    const fetchAllFlights = () => {
        if (currentUser?.id) {
            axios.get("/api/flight")
                .then(response=> {
                    setFlightData(response.data)
                })
                .catch(error => alert(error));
        }
    }

    useEffect(() => {
        fetchAllFlights();
    },[])


    const fetchUser = () => {
        if (currentUser?.id) {
            axios.get("/api/auth/me")
                .then(response => setCurrentUser(response.data))
        }
    }

    useEffect(() => {
        fetchUser();
    },[])

    return (
        <div className={"app"}>
            <Header currentUser={currentUser?.username}/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home currentUser={currentUser?.username} />}/>
                    <Route path={"/login"} element={<LoginPage />} />
                    <Route path={"/signup"} element={<SignupPage />} />
                    <Route element={<ProtectedRoutes user={currentUser}/>}>
                        <Route path={"/flight"} element={<FlightPage data={flightData} fetchAllFlights={fetchAllFlights} />} />
                        <Route path={"/flight/:id"} element={<FlightDetailPage fetchAllFlights={fetchAllFlights} />}/>
                        <Route path={"/flight/add"} element={<AddFlightPage fetchAllFlights={fetchAllFlights} />}/>
                        <Route path={"/airport"} element={<AirportPage />} />
                        <Route path={"/airline"} element={<AirlinePage />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
