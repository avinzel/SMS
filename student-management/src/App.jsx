import { useEffect, useState } from 'react'
import { StudentTable } from './components/StudentTable';
import { StudentForm } from './components/StudentForm';
import './App.css'

function App() {
  const [students, setStudents] = useState([]);

  const [isAdd, setAddStatus] = useState(true);
  const [student , setUpdateStudent] = useState({})
  async function getStudent(student_id) {
    const response = await fetch(`http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=student&student_id=${student_id}`)
    .then(response => response.json());
 console.log(response);
    if (!response["success"]) {
      alert(response["message"]);
      return;
    }else{
      setUpdateStudent(response["student"]);
      setAddStatus(false);
    }
  }


  async function getStudents() {
    //ajax in variables
    const response = await fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=student");
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
    function printStudents(){
      getStudents()
    }
    printStudents();
  }, [])

  return (
    <>
        <StudentTable 
          getStudents = {getStudents} 
          students = {students} 
          setAddStatus = {setAddStatus} 
          getStudent = {getStudent}
        />  
        <StudentForm 
          key={isAdd? "add" : student["student_id"]} 
          getStudents = {getStudents} isAdd = {isAdd} 
          setAddStatus = {setAddStatus} student = {student} 
          setAdd={setAddStatus} 
          setUpdateStudent = {setUpdateStudent}
        />
    </>
  )
}

export default App
