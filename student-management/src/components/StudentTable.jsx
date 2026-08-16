
import { StudentRow } from "./StudentRow"
import "../styles/Table.css";
export function StudentTable({ getStudents, students, getStudent}) {

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
                            <StudentRow key={student["student_id"]} getStudents={getStudents} student={student} getStudent = {getStudent}/>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}