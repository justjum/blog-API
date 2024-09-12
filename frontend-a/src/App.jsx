import { useState } from "react";
import Login from "../components/login";
import Home from "../components/home";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(e) {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <>
      {localStorage.accessToken ? (
        <Home handleLogin={handleLogin} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
