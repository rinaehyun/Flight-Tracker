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
import AirportMap from "./components/AirportMap.tsx";

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
    const [expandedAirportId, setExpandedAirportId] = useState<string | null>(null);

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

    const toggleBox = (airportId: string) => {
        setExpandedAirportId(expandedAirportId === airportId ? null : airportId);
    };

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
                {filteredAirportsData.map(airport => {
                    const isExpanded = expandedAirportId === airport.id;

                    return(
                        <div key={airport.id} className={"airport-card"} onClick={() => toggleBox(airport.id)}>
                            <div className={"airport-card-headline"}>
                                <div className={"airport-name"}>
                                    <h5 style={{ marginLeft: "15px", textAlign: "start", minWidth: "43px"}}>{airport.iataCode}</h5>
                                    <h6 style={{ textAlign: "start"}}>{capitalizeFirstLetter(airport.name)}</h6>
                                </div>
                                <div className={"airport-card-icons"}>
                                    {loggedInUser?.role != "USER" &&
                                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                                            <EditNoteIcon
                                                sx={{marginRight: '5px', cursor: "pointer", fontSize: "20px"}}
                                                onClick={() => navigate(`/airport/${airport.id}`)}
                                            />
                                            <DeleteIcon
                                                sx={{marginRight: '10px', cursor: "pointer", fontSize: "20px"}}
                                                onClick={() => handleDeleteAirport(airport)}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            {isExpanded && <>
                                <div className={"airport-info"}>
                                    <div className={"airport-info-details"}>
                                        <h6 className={"airport-info-title"}>Region Code</h6>
                                        <h6 className={"airport-info-desc"}>{airport.address.regionCode}</h6>
                                    </div>
                                    <div className={"airport-info-details"}>
                                        <h6 className={"airport-info-title"}>Country</h6>
                                        <h6 className={"airport-info-desc"}>{capitalizeFirstLetter(airport.address.countryName)} ({airport.address.countryCode})</h6>
                                    </div>
                                    <div className={"airport-info-details"}>
                                        <h6 className={"airport-info-title"}>Time Zone</h6>
                                        <h6 className={"airport-info-desc"}>UTC {airport.timeZone.offSet}</h6>
                                    </div>
                                </div>
                                <div className={"airport-info"}>
                                    <div className={"airport-info-details"}>
                                        <h6 className={"airport-info-title"}>Latitude</h6>
                                        <h6 className={"airport-info-desc"}>{airport.geoCode.latitude}</h6>
                                    </div>
                                    <div className={"airport-info-details"}>
                                        <h6 className={"airport-info-title-right"}>Longitude</h6>
                                        <h6 className={"airport-info-desc-right"}>{airport.geoCode.longitude}</h6>
                                    </div>
                                </div>
                                <div style={{ height: '40vh', width: '100%' }}>
                                    <AirportMap latitude={airport.geoCode.latitude} longitude={airport.geoCode.longitude} />
                                </div>
                            </>
                            }
                        </div>
                    )
                })}
            </section>
            {showDeleteModal &&
                <ConfirmationModal
                    handleClose={handleClose}
                    handleDeleteConfirm={() => handleDeleteConfirm(airportToDelete?.id)}
                    itemId={airportToDelete?.id}
                    itemName={airportNameToDelete}
                    modalName={"Airport"}
                />
            }
        </div>
    )
}