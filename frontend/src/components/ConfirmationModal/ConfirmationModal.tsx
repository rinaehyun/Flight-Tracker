import './ConfirmationModal.css';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import {Flight} from "../../types/model/dataType.ts";

type ConfirmationModalProps = {
    handleClose: () => void,
    handleDeleteConfirm: (id: string | undefined) => void,
    flightToBeDeleted: Flight | null;
}

export default function ConfirmationModal({ handleClose, handleDeleteConfirm, flightToBeDeleted }: Readonly<ConfirmationModalProps>) {
    console.log(flightToBeDeleted)
    return (
        <div className={"modal-backdrop"}>
            <div className={"modal"}>
                <div className={"modal-body"}>
                    <AirplanemodeInactiveIcon sx={{ marginTop: "40px", marginBottom: "20px", fontSize: "40px", cursor: "pointer" }} />
                    <h2 className={"modal-body-title"}>Delete Flight</h2>
                    <h4 className={"modal-body-message"}>Are you sure you want to delete </h4>
                    <h4><em style={{ color: "blue", margin: "auto" }}>{flightToBeDeleted?.flightCode} </em>?</h4>
                </div>
                <div className={"modal-buttons"}>
                    <button className={"close-btn"} onClick={handleClose}>No, cancel</button>
                    <button className={"delete-btn"} onClick={() => handleDeleteConfirm(flightToBeDeleted?.id)}>Yes, delete!</button>
                </div>
            </div>
        </div>
    )
}