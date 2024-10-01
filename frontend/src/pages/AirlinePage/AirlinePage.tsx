import './AirlinePage.css';
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";
import {useEffect} from "react";

type AirlinePageProps = {
    loggedInUser: BasicUser | null | undefined,
}

export default function AirlinePage({ loggedInUser }: Readonly<AirlinePageProps>) {

    const fetchAllAirlines = () => {
        if (loggedInUser?.username) {
            axios.get("/api/airline")
                .then(response=> {
                    console.log(response.data);
                    //setAirportsData(response.data)
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
                {/*<button onClick={() => {}} style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "10px",
                    fontSize: "0.7em"
                }}>{"Add"}</button>*/}
            <section>
                <div className={"airline-card"}>

                </div>
            </section>

        </div>
    )
}