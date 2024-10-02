import AirlineForm from "../../../components/AirlineForm/AirlineForm.tsx";

export default function AddAirlinePage() {

    return(
        <div className={"add-airport-form-container"}>
            <h3>Add A New Airline</h3>
            <AirlineForm
                buttonLabel={"Add a new airline"}
            />
        </div>
    )
}