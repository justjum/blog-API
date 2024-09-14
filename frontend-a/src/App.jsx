import { useState } from "react";
import Header from "../components/header";
import Home from "../components/home";
import SignUp from "../components/sign-up";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displaySignUp, setDisplaySignUp] = useState(false);

  function handleLogin(e) {
    setIsLoggedIn(e);
  }

  function handleSignUp(e) {
    setDisplaySignUp(e);
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
      />
      <Home handleLogin={handleLogin} />
      <SignUp handleSignUp={handleSignUp} displaySignUp={displaySignUp} />
    </>
  );
}

export default App;
