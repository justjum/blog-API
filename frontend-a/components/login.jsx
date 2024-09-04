import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Fetching");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        username: username,
        password: password,
      },
      mode: "cors",
    };

    console.log(requestOptions);

    fetch("//127.0.0.1:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        username: username,
        password: password,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername("");
        setPassword("");
        console.log(data);
        // note using deconstructuring is better for cleaner code
        const { access, refresh } = data.access_token;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
      });
  };

  return (
    <>
      <div className="login card">
        <h1>Login</h1>
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
      </div>
    </>
  );
}
