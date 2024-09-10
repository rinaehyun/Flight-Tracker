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
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import {User} from "./types/auth/userType.ts";

function App() {
    const [flightData, setFlightData] = useState<Flight[]>([]);
    const [currentUser, setCurrentUser] = useState<User>({
        id: '',
        githubId: ''
    });

    const fetchAllFlights = () => {
        axios.get("/api/flight")
            .then(response=> {
                setFlightData(response.data)
            })
            .catch(error => alert(error));
    }

    useEffect(() => {
        fetchAllFlights();
    },[])

    useEffect(() => {
        axios.get("/api/auth/user")
            .then(response => setCurrentUser(response.data))
    },[])

    return (
        <div className={"app"}>
            <Header currentUser={currentUser.githubId}/>
            <main>
                <Routes>
                    <Route path={"/"} element={<Home />}/>
                    <Route path={"/login"} element={<LoginPage />}/>
                    <Route path={"/flight"} element={<FlightPage data={flightData} fetchAllFlights={fetchAllFlights} />} />
                    <Route path={"/flight/:id"} element={<FlightDetailPage fetchAllFlights={fetchAllFlights} />}/>
                    <Route path={"/flight/add"} element={<AddFlightPage fetchAllFlights={fetchAllFlights} />}/>
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
