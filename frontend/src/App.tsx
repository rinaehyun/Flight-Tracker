import './App.css'
import {Route, Routes} from "react-router-dom";
import WelcomePage from "./pages/welcompage/WelcomePage.tsx";
import TrackingPage from "./pages/trackingpage/TrackingPage.tsx";

function App() {

    return (
        <main>
            <Routes>
                <Route path={"/"} element={<WelcomePage />}/>
                <Route path={"/tracking"} element={<TrackingPage />}/>
            </Routes>
        </main>
    )
}

export default App
