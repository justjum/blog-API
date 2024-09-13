import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //ORIGINAL FETCH CALL
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      mode: "cors",
    };

    console.log(requestOptions);

    fetch("//127.0.0.1:3000/login", requestOptions).then((response) =>
      response.json().then((data) => {
        // Reset the login form
        setUsername("");
        setPassword("");
        console.log(data.token);
        // Save token to local storage
        localStorage.setItem("accessToken", data.token);
        handleLogin(true);
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
