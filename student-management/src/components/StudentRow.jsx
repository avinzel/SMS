export function StudentRow({ setStudents, student }) {
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
                    <button className="delete">
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