import './FlightList.css'
import {Flight} from "../../../../types/model/dataType.ts";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {calculateDuration, formatDate, formatTime} from "../../../../utils/functionsForTime.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal.tsx";
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Notification from "../../../../components/Notification/Notification.tsx";
import {useFetchOptions} from "../../../../hooks/useFetchOptions.ts";
import {useNotificationTimer} from "../../../../hooks/useNotificationTimer.ts";
import {BasicUser} from "../../../../types/auth/userType.ts";

type FlightListProps = {
    data: Flight[],
    fetchAllFlights: () => void,
    loggedInUser: BasicUser | null | undefined
}

export default function FlightList({ data, fetchAllFlights, loggedInUser }: Readonly<FlightListProps>) {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [flightToDelete, setFlightToDelete] = useState<Flight | null>(null);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const { airlines } = useFetchOptions();

    const navigate = useNavigate();

    const handleClose = (): void => {
        setShowDeleteModal(false);
    }

    const handleDeleteFlight = (flight: Flight): void => {
        setFlightToDelete(flight);
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = (id: string | undefined): void => {
        if (id) {
            axios.delete('/api/flight/' + id)
            .then(response => {
                if (response.status === 200) {
                    fetchAllFlights();
                    setShowNotification(true);
                    console.log('Flight deleted successfully');
                }
            })
            .catch(error => console.log(error.message));
            navigate("/flight");
            setShowDeleteModal(false);
        }
    }

    useNotificationTimer(showNotification, setShowNotification);

    return(
        <div>
            {showNotification && <Notification
                setShowNotification={setShowNotification}
                message={`${flightToDelete?.flightCode} has been deleted.`}
                messageType={"success"}
            />}
            {data.map(flight => (
                <div key={flight.id} className={"flight-card"}>
                    <div className={"flight-card-headline"}>
                        <div className={"flight-card-airline"}>
                            {loggedInUser?.role != "USER" &&
                                <FlightTakeoffIcon sx={{fontSize: "25px"}}/>
                            }
                            <h4>
                                {airlines
                                    .filter(airline => airline.code.toLowerCase() === flight.airline.toLowerCase())
                                    .map(filteredAirline => filteredAirline.name)
                                }
                            </h4>
                            <h4>{flight.flightCode}</h4>
                        </div>
                        <div className={"flight-card-icons"}>
                            {loggedInUser?.role != "USER" &&
                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <EditNoteIcon
                                        sx={{marginRight: '5px', cursor: "pointer"}}
                                        onClick={() => navigate(`/flight/${flight.id}`)}
                                    />
                                    <DeleteIcon
                                        sx={{marginRight: '15px', cursor: "pointer"}}
                                        onClick={() => handleDeleteFlight(flight)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <div className={"flight-card-detail"}>
                        <div className={"flight-origin"}>
                            <h3>{flight.origin}</h3>
                            <h5>{formatDate(flight.departureTime)}</h5>
                            <h5>{formatTime(flight.departureTime)}</h5>
                        </div>
                        <p style={{fontSize: "16px"}}>{calculateDuration(flight.departureTime, flight.arrivalTime)}</p>
                        <div className={"flight-destination"}>
                            <h3>{flight.destination}</h3>
                            <h5>{formatDate(flight.arrivalTime)}</h5>
                            <h5>{formatTime(flight.arrivalTime)}</h5>
                        </div>
                    </div>
                    {showDeleteModal &&
                        <ConfirmationModal
                            handleClose={handleClose}
                            handleDeleteConfirm={() => handleDeleteConfirm(flightToDelete?.id)}
                            itemId={flightToDelete?.id}
                            itemName={flightToDelete?.flightCode}
                            modalName={"Flight"}
                        />
                    }
                </div>
            ))}
        </div>
    )
}