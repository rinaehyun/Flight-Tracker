import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Header from "./layouts/Header/Header.tsx";
import Footer from "./layouts/Footer/Footer.tsx";
import FlightPage from "./pages/FlightPage/FlightPage.tsx";
import axios from 'axios';
import {useEffect, useState} from "react";
import {Flight} from "./types/model/dataType.ts";
import AddFlightPage from "./pages/AddFlightPage/AddFlightPage.tsx";
import FlightDetailPage from "./pages/FlightDetailPage/FlightDetailPage.tsx";
import {BasicUser, UserForLogin} from "./types/auth/userType.ts";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignupPage from "./pages/LoginPage/SignupPage.tsx";
import AirportPage from "./pages/AirportPage/AirportPage.tsx";
import AirlinePage from "./pages/AirlinePage/AirlinePage.tsx";
import ProtectedRoutes from "./auth/ProtectedRoutes.tsx";

function App() {
    const [flightData, setFlightData] = useState<Flight[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<BasicUser | null | undefined>({
        id: '',
        username: '',
        role: ''
    })
    const [showLoginNotification, setShowLoginNotification] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchAllFlights = () => {
        if (loggedInUser?.username) {
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

    const login = (user: UserForLogin) => {
        axios.post("/api/auth/login", {}, {
            auth: {
                username: user.username,
                password: user.password
            }
        })
            .then(() => {
                    axios.get("/api/auth/me")
                        .then(response => {
                            console.log(response.data);
                            setLoggedInUser(response.data);
                        })
                        .then(() => navigate("/"));
            })
            .catch(error => {
                setLoggedInUser(null);
                setShowLoginNotification(true);
                console.error(error.response.data)
            })
    }

    const logout = () => {
        axios.post("/api/auth/logout")
            .then(() => navigate("/login"))
            .catch(error => console.error(error))
            .finally(() => setLoggedInUser(null));
    }

    return (
        <div className={"app"}>
            <Header userId={loggedInUser?.id} logout={logout}/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home userId={loggedInUser?.id} />}/>
                    <Route path={"/login"} element={<LoginPage login={login} setShowLoginNotification={setShowLoginNotification} showLoginNotification={showLoginNotification} />} />
                    <Route path={"/signup"} element={<SignupPage />} />
                    <Route element={<ProtectedRoutes userId={loggedInUser?.id}/>}>
                        <Route path={"/flight"} element={<FlightPage data={flightData} fetchAllFlights={fetchAllFlights} />} />
                        <Route path={"/flight/:id"} element={<FlightDetailPage fetchAllFlights={fetchAllFlights} />}/>
                        <Route path={"/flight/add"} element={<AddFlightPage fetchAllFlights={fetchAllFlights} />}/>
                        <Route path={"/airport"} element={<AirportPage loggedInUser={loggedInUser}/>} />
                        <Route path={"/airline"} element={<AirlinePage />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
