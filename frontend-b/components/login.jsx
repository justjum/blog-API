import { useState, useEffect } from "react";

export default function Login({ handleLogin, setAlertMessage }) {
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

    fetch(`${import.meta.env.VITE_CONNECT}/login`, requestOptions).then((response) =>
      response.json().then((data) => {
        // Reset the login form
        if (data.error) {
          const alertDialog = document.getElementById("alert-dialog");
          setAlertMessage(data.error);
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
          <a href="" onClick={handleSignUpClick}>
          (Login or Sign Up to Manage Posts)
          </a>
        </form>

      </div>
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
