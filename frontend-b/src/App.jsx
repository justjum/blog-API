import { useState, useEffect } from 'react'
import './App.css'
import { isExpired } from "react-jwt";
import Navbar from "../components/navbar";
import Home from "../components/home"
import Alert from "../components/alert"
import SignUp from '../components/sign-up'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignUp, setDisplaySignUp] = useState(false)
  const [alertMessage, setAlertMessage] = useState("");

  // Check Authentication
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (isExpired(token)) {
      localStorage.removeItem("accessToken");
      handleLogin(false);
    } else {
      handleLogin(true);
    }
  }, [localStorage]);

  function handleLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

   

  return (
    <>
      <Navbar handleLogin={handleLogin}/>
      <Home setAlertMessage={setAlertMessage} setDisplaySignUp={setDisplaySignUp} handleLogin={handleLogin}/> 
      <SignUp setAlertMessage={setAlertMessage} displaySignUp={displaySignUp}/>
      <Alert alertMessage={alertMessage} />
    </>
  )
}

export default App
