import { useEffect, useState } from 'react'
import { StudentTable } from '../../components/StudentTable';
import { StudentForm } from '../../components/StudentForm';
import { AddButton } from '../../components/AddButton';
import { Search } from '../../components/Search';
import { Logout } from '../../components/LogoutButton';
import { useNavigate } from 'react-router-dom';

export function HomePage({currentUser, setCurrentUser}) {
    const [students, setStudents] = useState([]);
    const [formModal, setFormModal] = useState(false)
    const [isAdd, setAddStatus] = useState(true);
    const [student, setUpdateStudent] = useState({})
    const [searchStudent, setSearchStudent] = useState({});
    const nav = useNavigate()
    async function getStudent(student_id) {
        const response = await fetch(`http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=student&student_id=${student_id}`,{credentials:"include"})
            .then(response => response.json());

        if (!response["success"]) {
            alert(response["message"]);
            return;
        } else {
            setFormModal(true);
            setUpdateStudent(response["student"]);
            setAddStatus(false);
        }
    }


    async function getStudents() {
        //ajax in variables
        const response = await fetch(`http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=student&student_name=${searchStudent["student_name"] ?? ""}&course=${searchStudent["course"] ?? ""}`, {credentials:"include"});
        const data = await response.json();

        setStudents(data);

        //ajax then

        // fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=student")
        //   .then(response => response.json())
        //   .then(response => {
        //     setStudents(response);
        //   })
    }
    useEffect(() => {    
        // if (currentUser["user_name"] == undefined || currentUser["account_id"] == undefined) {
        //     nav("/");
        // }

        function printStudents() {
            getStudents()
        }
        printStudents();
    }, [searchStudent])

    return (
        <>
        <p>{currentUser["user_name"]}</p>
            <Search setSearchStudent={setSearchStudent} getStudents={getStudents}></Search>
            <StudentTable
                getStudents={getStudents}
                students={students}
                setAddStatus={setAddStatus}
                getStudent={getStudent}
            />
            <StudentForm
                key={isAdd ? "add" : student["student_id"]}
                getStudents={getStudents} isAdd={isAdd}
                setAddStatus={setAddStatus} student={student}
                setAdd={setAddStatus}
                setUpdateStudent={setUpdateStudent}
                formModal={formModal}
                setFormModal={setFormModal}
            />
            <AddButton setFormModal={setFormModal} setUpdateStudent={setUpdateStudent} setAddStatus={setAddStatus} />
            <Logout setCurrentUser= {setCurrentUser}/>
        </>
    )
}