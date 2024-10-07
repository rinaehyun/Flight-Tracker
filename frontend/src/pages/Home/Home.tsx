import './Home.css';
import {Link} from "react-router-dom";
import {BasicUser} from "../../types/auth/userType.ts";
import flightImage from './img/flight-page.png';
import airportImage from './img/airport-page.png';

type HomeProps = {
    user: BasicUser | null | undefined
}

export default function Home({ user }: Readonly<HomeProps>) {

    return(
        <div className={"home-page"}>
            <h4>Welcome to Flight App!</h4>
            {user?.username ?
                <>
                    <section className={"home-greetings"}>

                        <h5>Hi, <Link to={`/user/${user.id}`}
                                      style={{color: "#003580", fontWeight: "bold"}}>{user?.username}!</Link></h5>
                        <h5>You have successfully logged in to your account. </h5>
                    </section>
                    <hr style={{border: '1px dotted gray', width: '100%', marginTop: "40px"}}/>
                    <section className={"home-info-section"}>
                        <div className={"image-flight-container"}>
                            <img src={flightImage}
                                 alt={"flight-page-screenshot"}
                                 style={{height: "auto", width: "40%", border: "1px solid #003580"}}></img>
                            <h6 style={{textAlign: "end", alignSelf: "center"}}> You can explore <br/> the flight
                                information. </h6>
                        </div>
                        <div className={"image-airport-container"}>
                            <img src={airportImage}
                                 alt={"airport-page-screenshot"}
                                 style={{height: "auto", width: "40%", border: "1px solid #003580"}}></img>
                            <h6 style={{textAlign: "start", alignSelf: "center"}}> You can find
                                information <br/> regarding
                                all available airports.</h6>
                        </div>
                    </section>
                </> :
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p>Already have an <Link to={"/login"} style={{color: "blue"}}>account</Link></p>
                    <p>I need to create a new account <Link to={"/signup"} style={{color: "blue"}}>sign up</Link></p>
                </div>
            }
        </div>
    )
}