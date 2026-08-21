import { HomePage } from './pages/homepage/Home'
import { Routes, Route } from "react-router-dom";
import { Login } from './pages/loginpage/Login';
import { SignUp } from './pages/signuppage/SignUp';
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    async function checkSession() {
      const res = await fetch("http://localhost/websites/3rdYear/Re-React/SMS/backend/api/api.php?action=check_session",{credentials:"include"});

      const response = await res.json();
      
      if (response["success"]) {
          setCurrentUser(response["account"]);
      }

    }
    checkSession();
  }, [])
  return (
    <>
      <Routes>
        <Route index element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}></Route>
        <Route path="/signup" element={<SignUp />} ></Route>
        <Route path="/students" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser}> </HomePage>} ></Route>
      </Routes>

    </>
  )
}

export default App
