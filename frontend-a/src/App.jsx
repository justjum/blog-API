import { useState, useEffect } from "react";
import Header from "../components/header";
import Home from "../components/home";
import SignUp from "../components/sign-up";
import Alert from "../components/alert";
import BlogPosts from "../components/blog-posts";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  function handleLogin(e) {
    setIsLoggedIn(e);
  }

  const useSignUpPopup = (e) => {
    useEffect(() => {
      alert(e);
      console.log(e);
      setDisplaySignUp(e);
    });
  };

  const useErrorPopup = (e) => {
    useEffect(() => {
      alert(e);
      console.log(e);
      setDisplaySignUp(e);
    });
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        useSignUpPopup={useSignUpPopup}
        setAlertMessage={setAlertMessage}
      />
      <Home handleLogin={handleLogin} />
      <SignUp
        useSignUpPopup={useSignUpPopup}
        displaySignUp={displaySignUp}
        setAlertMessage={setAlertMessage}
      />
      <Alert alertMessage={alertMessage} />
    </>
  );
}

export default App;
