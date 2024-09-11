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
    const [currentUser, setCurrentUser] = useState<BasicUser | null | undefined>({
        id: '',
        username: '',
        password: '',
        role: ''
    });
    const [loggedInUser, setLoggedInUser] = useState<UserForLogin | null | undefined>({
        username: '',
        password: '',
    })
    const navigate = useNavigate();

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

/*    const fetchUser = () => {
        if (currentUser?.id) {
            axios.get("/api/auth/me")
                .then(response => setCurrentUser(response.data))
        }
    }

    useEffect(() => {
        fetchUser();
    },[])*/

    const login = (user: UserForLogin) => {
        axios.post("/api/auth/login", {}, {
            auth: {
                username: user.username,
                password: user.password
            }
        })
            .then(() => {
                    axios.get("/api/auth/me")
                        .then(response => setLoggedInUser(response.data))
                        .then(() => navigate("/"));
            })
            .catch(error => {
                setLoggedInUser(null);
                console.error(error.response.data)
            })
    }
console.log(loggedInUser)
    return (
        <div className={"app"}>
            <Header currentUser={currentUser?.username}/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home currentUser={currentUser?.username} />}/>
                    <Route path={"/login"} element={<LoginPage login={login}/>} />
                    <Route path={"/signup"} element={<SignupPage />} />
                    <Route element={<ProtectedRoutes user={loggedInUser}/>}>
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
