import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSignUpPopup from "../hooks/useSignUpPopup";
import Alert from "../components/alert"

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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

    fetch("//127.0.0.1:3000/login", requestOptions).then((response) =>
      response.json().then((data) => {
        // Reset the login form
        if (data.error) {
          const alertDialog = document.getElementById("alert-dialog");
          setAlertMessage(data.error)
          alertDialog.showModal();
        }
        if (data.token) {
          setUsername("");
          setPassword("");
          // Save token to local storage
          localStorage.setItem("accessToken", data.token);
          handleLogin(true);
        }
      })
    );
  };

  const handleSignUpClick = (e) => {
    const dialog = document.getElementById("signup-dialog");
    e.preventDefault();
    dialog.showModal();
    //useSignUpPopup(true);
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit} method="post" className="loginForm">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="formInput"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="formInput"
          />
          <button type="submit">Login</button>
        </form>
        <a href="" onClick={handleSignUpClick}>
          (Login or Sign Up to Comment)
        </a>
      </div>
      <Alert alertMessage={alertMessage} />

    </>
  );
}

// {show && (<Alert 
//   className='center'
//   variant="danger"
//   onClose={() => setShow(false)} 
//   dismissible> 
    
//   <Alert.Heading>Error</Alert.Heading> 
//   <p>Error message goes here.</p> 
// </Alert> )

// }