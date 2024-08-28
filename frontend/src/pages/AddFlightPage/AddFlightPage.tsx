

export default function AddFlightForm() {

    const handleSubmit = () => {
        console.log("Submitted!");
    }

    return (
        <>
            <h3>Add A New Flight</h3>
            <form onSubmit={handleSubmit} className={"book-form"}>


                <div className={`book-info`}>
                    <label className={"book-label align-right"} htmlFor={"title"}>Title</label>
                    <input
                        type={"text"}
                        name={"title"}
                        value={book.title}
                        onChange={handleChange}
                        required={true}
                        disabled={!editable}
                    />
                </div>


                <div className={`book-info`}>
                    <label htmlFor={"publicationDate"} className={"book-label align-right"}>Publication Date</label>
                    <input
                        type={"date"}
                        name={"publicationDate"}
                        value={book.publicationDate}
                        onChange={handleChange}
                        required={true}
                        disabled={!editable}
                    />
                </div>
                {editable && <button type={"submit"}>{action}</button>}
            </form>
        </>
    )
}