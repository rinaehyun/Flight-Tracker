import './FlightList.css'
import {Flight} from "../../../../types/model/dataType.ts";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {formatDate, formatTime, parseDuration} from "../../../../utils/functionsForTime.ts";
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
import FlightDetails from "../FlightDetails/FlightDetails.tsx";

type FlightListProps = {
    data: Flight[],
    fetchAllFlights: () => void,
    loggedInUser: BasicUser | null | undefined
}

export default function FlightList({ data, fetchAllFlights, loggedInUser }: Readonly<FlightListProps>) {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [flightToDelete, setFlightToDelete] = useState<Flight | null>(null);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);

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

    const toggleBox = (flightId: string) => {
        setExpandedFlightId(expandedFlightId === flightId ? null : flightId);
    };

    useNotificationTimer(showNotification, setShowNotification);

    return(
        <div>
            {showNotification && <Notification
                setShowNotification={setShowNotification}
                message={`${flightToDelete?.flightCode} has been deleted.`}
                messageType={"success"}
            />}

            {data.map(flight => {
                const isExpanded = expandedFlightId === flight.id;

                return(
                    <div key={flight.id} className={"flight-card"} onClick={() => toggleBox(flight.id)}>
                        <div className={"flight-card-headline"}>
                            <div className={"flight-card-airline"}>
                                {loggedInUser?.role != "USER" &&
                                    <FlightTakeoffIcon sx={{fontSize: "20px"}}/>
                                }
                                <h5>
                                    {airlines
                                        .filter(airline => airline.code.toLowerCase() === flight.airline.toLowerCase())
                                        .map(filteredAirline => filteredAirline.name)
                                    }
                                </h5>
                            </div>
                            <div className={"flight-card-icons"}>
                                {loggedInUser?.role != "USER" &&
                                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                                        <EditNoteIcon
                                            sx={{marginRight: '5px', cursor: "pointer", fontSize: "20px"}}
                                            onClick={() => navigate(`/flight/${flight.id}`)}
                                        />
                                        <DeleteIcon
                                            sx={{marginRight: '10px', cursor: "pointer", fontSize: "20px"}}
                                            onClick={() => handleDeleteFlight(flight)}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={"flight-card-detail"}>
                            <div className={"flight-origin"}>
                                <h5 className={"flight-airport"}>{flight.origin}</h5>
                                <h6 className={"flight-date"}>{formatDate(flight.departureTime)}</h6>
                                <h6 className={"flight-time"}>{formatTime(flight.departureTime)}</h6>
                            </div>
                            <div className={"flight-duration-info"}>
                                <h6 className={"flight-duration"}>{parseDuration(flight.duration)}</h6>
                                <hr style={{border: '1px solid gray', width: '80%'}}/>
                            </div>
                            <div className={"flight-destination"}>
                                <h5 className={"flight-airport"}>{flight.destination}</h5>
                                <h6 className={"flight-date"}>{formatDate(flight.arrivalTime)}</h6>
                                <h6 className={"flight-time"}>{formatTime(flight.arrivalTime)}</h6>
                            </div>
                        </div>
                        {isExpanded && <FlightDetails flight={flight} />}
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
                );
            })}
        </div>
    )
}