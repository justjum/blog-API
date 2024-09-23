import { useState, useEffect } from "react";
import Header from "../components/header";
import Home from "../components/home";
import SignUp from "../components/sign-up";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [displayError, setDisplayError] = useState(false);

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
      />
      <Home handleLogin={handleLogin} />
      <SignUp useSignUpPopup={useSignUpPopup} displaySignUp={displaySignUp} />
    </>
  );
}

export default App;
