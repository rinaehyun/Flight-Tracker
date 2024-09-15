import './AirportPage.css'
import {useEffect, useState} from "react";
import {Airport} from "../../types/model/dataType.ts";
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";
import {capitalizeFirstLetter} from "../../utils/funtioncs.ts";
import {AirportFilterType} from "../../types/enum.ts";
import AirportFilter from "./components/AirportFilter/AirportFilter.tsx";
import {regionMapping} from "../../utils/Mapping.ts";
import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal.tsx";
import {useNotificationTimer} from "../../hooks/useNotificationTimer.ts";
import Notification from "../../components/Notification/Notification.tsx";

type AirportPageProps = {
    loggedInUser: BasicUser | null | undefined,
}

export default function AirportPage({ loggedInUser }: Readonly<AirportPageProps> ) {
    const [airportsData, setAirportsData] = useState<Airport[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<AirportFilterType>({
        region: undefined,
        airport: undefined
    });
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [airportToDelete, setAirportToDelete] = useState<Airport | null>(null);
    const [showNotification, setShowNotification] = useState<boolean>(false);

    const navigate = useNavigate();

    const fetchAllAirports = () => {
        if (loggedInUser?.username) {
            axios.get("/api/airport")
                .then(response=> {
                    setAirportsData(response.data)
                })
                .catch(error => alert(error));
        }
    }

    useEffect(() => {
        fetchAllAirports();
    }, []);

    const handleClick = () => {
        navigate('/airport/add');
    }

    const handleClose = (): void => {
        setShowDeleteModal(false);
    }

    const handleDeleteAirport = (airport: Airport): void => {
        console.log(airport)
        setAirportToDelete(airport);
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = (id: string | undefined): void => {
        if (id) {
            axios.delete('/api/airport/' + id)
                .then(response => {
                    if (response.status === 200) {
                        fetchAllAirports();
                        setShowNotification(true);
                        console.log('Airport deleted successfully');
                    }
                })
                .catch(error => console.log(error.message));
            navigate("/airport");
            setShowDeleteModal(false);
        }
    }

    useNotificationTimer(showNotification, setShowNotification);

    const airportNameToDelete = airportToDelete?.iataCode + ", " + capitalizeFirstLetter(airportToDelete?.name + " airport")

    const filteredAirportsData = airportsData
        .filter(airport =>
            !selectedFilter.region ||
            regionMapping[airport.address.regionCode] === selectedFilter.region
        )
        .filter(airport =>
            !selectedFilter.airport ||
            airport.iataCode === selectedFilter.airport
        );

    return (
        <div className={"airport-page"}>
            {showNotification && <Notification
                setShowNotification={setShowNotification}
                message={`${airportNameToDelete} has been deleted.`}
                messageType={"success"}
            />}
            <h3>Airport Information</h3>
            {loggedInUser?.role != "USER" &&
                <button onClick={handleClick} style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "10px",
                    fontSize: "0.7em"
                }}>{"Add"}</button>
            }
            <AirportFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
            <section>
                {filteredAirportsData.map(airport => (
                    <div key={airport.id} className={"airport-card"}>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <EditNoteIcon
                                sx={{ marginRight: '5px', cursor: "pointer" }}
                                onClick={() => navigate(`/airport/${airport.id}`)}
                            />
                            <DeleteIcon
                                sx={{ marginRight: '15px', cursor: "pointer" }}
                                onClick={() => handleDeleteAirport(airport)}
                            />
                        </div>
                        <p>IATA Code: {airport.iataCode}</p>
                        <p>Location: {capitalizeFirstLetter(airport.name)}, {capitalizeFirstLetter(airport.address.countryName)} </p>
                    </div>
                ))}
            </section>
            {showDeleteModal &&
                <ConfirmationModal
                    handleClose={handleClose}
                    handleDeleteConfirm={() => handleDeleteConfirm(airportToDelete?.id)}
                    itemId={airportToDelete?.id}
                    itemName={airportNameToDelete}
                />
            }
        </div>
    )
}