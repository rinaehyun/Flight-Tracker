import './AirlinePage.css';
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";
import {useEffect, useState} from "react";
import {Airline} from "../../types/model/dataType.ts";
import {useNavigate} from "react-router-dom";

type AirlinePageProps = {
    loggedInUser: BasicUser | null | undefined,
}

export default function AirlinePage({ loggedInUser }: Readonly<AirlinePageProps>) {
    const [airlinesData, setAirlinesData] = useState<Airline[]>([]);

    const navigate = useNavigate();

    const fetchAllAirlines = () => {
        if (loggedInUser?.username) {
            axios.get("/api/airline")
                .then(response=> {
                    setAirlinesData(response.data)
                })
                .catch(error => alert(error));
        }
    }

    useEffect(() => {
        fetchAllAirlines();
    }, []);

    return (
        <div className={"airline-page"}>
            <h3>Airport Information</h3>
                <button onClick={() => navigate("/airline/add")} style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "10px",
                    fontSize: "0.7em"
                }}>{"Add"}</button>
            <section>
                {airlinesData.map(airline => {
                    return(
                        <div key={airline.id} className={"airline-card"}>
                            <h6>{airline.iataCode}</h6>
                            <h6>{airline.icaoCode}</h6>
                            <h6>{airline.businessName}</h6>
                            <h6>{airline.commonName}</h6>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}