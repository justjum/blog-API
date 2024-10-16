import { useState, useEffect } from "react";
import Header from "../components/header";
import Home from "../components/home";
import SignUp from "../components/sign-up";
import Alert from "../components/alert";
import Loading from "../components/loading";
import LinkHeader from "../components/linkHeader";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <LinkHeader />
      {isLoading ? <Loading /> : ""}
      <Header
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        useSignUpPopup={useSignUpPopup}
        setAlertMessage={setAlertMessage}
      />
      <Home
        handleLogin={handleLogin}
        setAlertMessage={setAlertMessage}
        isLoggedIn={isLoggedIn}
        setIsLoading={setIsLoading}
      />
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
