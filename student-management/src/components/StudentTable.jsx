
import { StudentRow } from "./StudentRow"
import "./Table.css";
export function StudentTable({ setStudents, students }) {

    return (
        <>

            <table className="student-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Age</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => {
                        return (
                            <StudentRow key={student["student_id"]} setStudents={setStudents} student={student} />
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}