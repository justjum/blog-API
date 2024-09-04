import { useState } from "react";
import Login from "../components/login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  if (localStorage.token !== null) {
    authoriseUser();
  }

  return <>{user ? "" : <Login />}</>;
}

export default App;
