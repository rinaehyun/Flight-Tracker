import './ConfirmationModal.css';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';

type ConfirmationModalProps = {
    handleClose: () => void,
    handleDeleteConfirm: (id: string | undefined) => void,
    itemId?: string | undefined,
    itemName: string | undefined
}

export default function ConfirmationModal({ handleClose, handleDeleteConfirm, itemId, itemName }: Readonly<ConfirmationModalProps>) {

    return (
        <div className={"modal-backdrop"}>
            <div className={"modal"}>
                <div className={"modal-body"}>
                    <AirplanemodeInactiveIcon sx={{ marginTop: "40px", marginBottom: "20px", fontSize: "40px", cursor: "pointer" }} />
                    <h2 className={"modal-body-title"}>Delete Flight</h2>
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