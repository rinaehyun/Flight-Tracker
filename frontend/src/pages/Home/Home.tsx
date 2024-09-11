import {Link} from "react-router-dom";

type HomeProps = {
    currentUser: string | undefined,
}

export default function Home({ currentUser }: HomeProps) {

    return(
        <>
            <h2>Welcome to Flight App!</h2>
            {currentUser ?
                <h5> You are logged in. </h5> :
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p>Already have an <Link to={"/login"} style={{color: "blue"}}>account</Link></p>
                    <p>I need to create a new account <Link to={"/signup"} style={{color: "blue"}}>sign up</Link></p>
                </div>
            }
        </>
    )
}