import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import TrackingPage from "./pages/trackingpage/TrackingPage.tsx";
import Header from "./layouts/Header/Header.tsx";
import Footer from "./layouts/Footer/Footer.tsx";

function App() {

    return (
        <div className={"app"}>
            <Header />
            <main>
                <Routes>
                    <Route path={"/"} element={<Home />}/>
                    <Route path={"/tracking"} element={<TrackingPage />}/>
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
