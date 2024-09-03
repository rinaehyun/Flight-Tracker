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

function App() {
    const [flightData, setFlightData] = useState<Flight[]>([]);

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

    return (
        <div className={"app"}>
            <Header />
            <main>
                <Routes>
                    <Route path={"/"} element={<Home />}/>
                    <Route path={"/flight"} element={<FlightPage data={flightData}/>}/>
                    <Route path={"/flight/:id"} element={<FlightDetailPage fetchAllFlights={fetchAllFlights}/>}/>
                    <Route path={"/flight/add"} element={<AddFlightPage fetchAllFlights={fetchAllFlights}/>}/>
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
