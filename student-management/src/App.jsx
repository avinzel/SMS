import { HomePage } from './pages/homepage/Home'
import {Routes, Route} from "react-router-dom";
import { Login } from './pages/loginpage/Login';
import { SignUp } from './pages/signuppage/SignUp';
import './App.css'

function App() {
  return(
    <>
      <Routes>
        <Route index element = {<Login/>}></Route>
        <Route path = "/signup" element ={<SignUp/>} ></Route>
        <Route  path = "/students" element= { <HomePage></HomePage>} ></Route>
      </Routes>
     
    </> 
  )
}

export default App
