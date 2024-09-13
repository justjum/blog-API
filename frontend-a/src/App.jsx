import { useState } from "react";
import Header from "../components/header";
import Home from "../components/home";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(e) {
    setIsLoggedIn(e);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      <Home handleLogin={handleLogin} />
    </>
  );
}

export default App;
