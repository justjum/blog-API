import { useState } from "react";
import Login from "../components/login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  if (localStorage.token !== null && localStorage.token !== undefined) {
    console.log(localStorage.token);
  } else {
    console.log("no token");
  }

  return <>{user ? "" : <Login />}</>;
}

export default App;
