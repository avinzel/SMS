import "../styles/AddButton.css"
export function AddButton({setFormModal, setUpdateStudent,  setAddStatus }){
    return(
        <>
            <button className="add-fab" onClick={()=>{setFormModal(true); setUpdateStudent({}); setAddStatus(true)}}>
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828925.png" alt="add" width="20" height="20" />
            </button>
        </>
    )
}