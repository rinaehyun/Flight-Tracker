import './AirlinePage.css';
import axios from "axios";
import {BasicUser} from "../../types/auth/userType.ts";
import {useEffect, useState} from "react";
import {Airline} from "../../types/model/dataType.ts";
import {useNavigate} from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal.tsx";
import {useNotificationTimer} from "../../hooks/useNotificationTimer.ts";
import Notification from "../../components/Notification/Notification.tsx";

type AirlinePageProps = {
    loggedInUser: BasicUser | null | undefined,
}

export default function AirlinePage({ loggedInUser }: Readonly<AirlinePageProps>) {
    const [airlinesData, setAirlinesData] = useState<Airline[]>([]);
    const [airlineToDelete, setAirlineToDelete] = useState<Airline>();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showDeleteSuccessNotification, setShowDeleteSuccessNotification] = useState<boolean>(false);

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

    const handleDeleteAirport = (airline: Airline): void => {
        console.log(airline)
        setAirlineToDelete(airline);
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = (id: string | undefined): void => {
        if (id) {
            axios.delete('/api/airline/' + id)
                .then(response => {
                    if (response.status === 200) {
                        fetchAllAirlines();
                        setShowDeleteSuccessNotification(true);
                        console.log("Airline deleted successfully.")
                    }
                })
                .catch(error => console.log(error.message));
            navigate("/airline");
            setShowDeleteModal(false);
        }
    }

    useNotificationTimer(showDeleteSuccessNotification, setShowDeleteSuccessNotification);

    return (
        <div className={"airline-page"}>
            {showDeleteSuccessNotification && <Notification
                setShowNotification={setShowDeleteSuccessNotification}
                message={`${airlineToDelete?.businessName} (IATA: ${airlineToDelete?.iataCode}) has been deleted.`}
                messageType={"success"}
            />}
            <h3>Airport Information</h3>
                {loggedInUser?.role != "USER" &&
                    <button onClick={() => navigate("/airline/add")} style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "10px",
                        fontSize: "0.7em"
                    }}>{"Add"}</button>
                }
            <section>
                {airlinesData.map(airline => {
                    return(
                        <div key={airline.id} className={"airline-card"}>
                            <div className={"airline-name"}>
                                <h5 style={{
                                    marginLeft: "15px",
                                    textAlign: "start",
                                    minWidth: "43px"
                                }}>{airline.iataCode}</h5>
                                <h6 style={{textAlign: "start"}}>{airline.businessName}</h6>
                            </div>
                            <div className={"airline-card-icons"}>
                                {loggedInUser?.role != "USER" &&
                                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                                        <EditNoteIcon
                                            sx={{marginRight: '5px', cursor: "pointer", fontSize: "20px"}}
                                            onClick={() => navigate(`/airline/${airline.id}`)}
                                        />
                                        <DeleteIcon
                                            sx={{marginRight: '10px', cursor: "pointer", fontSize: "20px"}}
                                            onClick={() => handleDeleteAirport(airline)}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
            </section>
            {showDeleteModal &&
                <ConfirmationModal
                    handleClose={() => setShowDeleteModal(false)}
                    handleDeleteConfirm={() => handleDeleteConfirm(airlineToDelete?.id)}
                    itemId={airlineToDelete?.id}
                    itemName={`${airlineToDelete?.businessName} (IATA: ${airlineToDelete?.iataCode})`}
                    modalName={"Airport"}
                />
            }
        </div>
    )
}