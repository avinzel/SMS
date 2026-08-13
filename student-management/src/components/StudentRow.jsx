export function StudentRow({ getStudents, student }) {

    async function deleteStudent(student_id){
        const response = await fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=student",
            {
                method: "DELETE",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(student_id)
            }
        ).then(response => response.json())
        if (response["success"]) {
            alert(response["message"]);
            getStudents()
        }else{
            alert(response["message"]);
        }
    }
    return (
        <tr>
            <td>{student["student_id"]}</td>
            <td>{student["student_name"]}</td>
            <td>{student["age"]}</td>
            <td>{student["course"]}</td>
            <td>
                <div style={{
                    display : "flex",
                    justifyContent : "space-evenly"}}>
                    <button className="delete" onClick={()=> deleteStudent(student["student_id"])}>
                        Delete
                    </button>
                    <button className="update">
                        Update
                    </button>
                </div>
            </td>
        </tr>


    )
}