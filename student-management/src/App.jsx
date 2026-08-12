import { useEffect, useState } from 'react'
import { StudentTable } from './components/StudentTable';
import { StudentForm } from './components/StudentForm';
import './App.css'

function App() {
  const [students, setStudents] = useState([]);

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
        <StudentTable setStudents = {setStudents} students = {students}></StudentTable>
        <StudentForm getStudents = {getStudents}/>
    </>
  )
}

export default App
