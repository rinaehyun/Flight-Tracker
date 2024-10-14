import './ConfirmationModal.css';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AirlinesIcon from '@mui/icons-material/Airlines';

type ConfirmationModalProps = {
    handleClose: () => void,
    handleDeleteConfirm: (id: string | undefined) => void,
    itemId: string | undefined,
    itemName: string | undefined,
    modalName: "Flight" | "Airport" | "User" | "Airline",
}

export default function ConfirmationModal(
    { handleClose, handleDeleteConfirm, itemId, itemName, modalName}: Readonly<ConfirmationModalProps>
)
{
    const iconStyles = {

            marginTop: "40px",
            marginBottom: "20px",
            fontSize: "45px",
            cursor: "pointer"

    }

    return (
        <div className={"modal-backdrop"}>
            <div className={"modal"}>
                <div className={"modal-body"}>
                    { modalName == "Flight" && <AirplanemodeInactiveIcon sx={[iconStyles]} />}
                    { modalName == "Airport"  && <FlightTakeoffIcon sx={[iconStyles]} />  }
                    { modalName == "User" && <PersonOffIcon sx={[iconStyles]} /> }
                    { modalName == "Airline" && <AirlinesIcon sx={[iconStyles]} /> }
                    <h2 className={"modal-body-title"}>Delete {modalName}</h2>
                    <h4 className={"modal-body-message"}>Are you sure you want to delete </h4>
                    <h4><em style={{ color: "blue", margin: "auto" }}>{itemName} </em>?</h4>
                </div>
                <div className={"modal-buttons"}>
                    <button className={"close-btn"} onClick={handleClose}>No, cancel</button>
                    <button className={"delete-btn"} onClick={() => handleDeleteConfirm(itemId)}>Yes, delete!</button>
                </div>
            </div>
        </div>
    )
}