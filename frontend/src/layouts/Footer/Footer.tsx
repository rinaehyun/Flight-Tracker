import './Footer.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MenuIcon from '@mui/icons-material/Menu';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <footer>
            <div className={"mobile-version-footer"}>
                <KeyboardArrowLeftIcon style={{fontSize: "23px"}}/>
                <RadioButtonUncheckedIcon style={{fontSize: "22px"}}/>
                <MenuIcon style={{fontSize: "23px"}}/>
            </div>

            <div className={"web-version-footer"}>
                <div className={"footer-logo"}>
                    <FlightTakeoffIcon style={{fontSize: "23px"}}/>
                    <h5>Flight Management App</h5>
                </div>
                <div className={"footer-text"}>
                    <h6 style={{ fontWeight: "normal"}}>About Us | Terms of Use | Privacy Policy | Contact US | Career</h6>
                </div>
                <div className={"footer-icons"}>
                    <FacebookIcon style={{fontSize: "18px"}}/>
                    <InstagramIcon style={{fontSize: "18px"}}/>
                    <XIcon style={{fontSize: "18px"}}/>
                    <LinkedInIcon style={{fontSize: "18px"}}/>
                </div>
            </div>
        </footer>
    )
}