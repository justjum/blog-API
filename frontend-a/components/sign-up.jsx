import { useState } from "react";
import Alert from "../components/alert";

export default function SignUp({ displaySignUp, setAlertMessage }) {
  const [username, setUsername] = useState("");
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleClose = (e) => {
    const dialog = document.getElementById("signup-dialog");
    dialog.close();
  };
  const handleSignUp = (e) => {
    const dialog = document.getElementById("signup-dialog");
    e.preventDefault();

    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        f_name: f_name,
        l_name: l_name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      }),
      mode: "cors",
    };

    fetch(`${import.meta.env.VITE_CONNECT}/`, requestOptions).then((response) =>
      response.json().then((data) => {
        const alertDialog = document.getElementById("alert-dialog");
        if (data.errors) {
          console.log(data.errors);
          setAlertMessage(data.errors);
          alertDialog.showModal();
        } else {
          setAlertMessage(data.msg);
          setUsername("");
          setF_name("");
          setL_name("");
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
          console.log(data);
          dialog.close();
          alertDialog.showModal();
        }
      })
    );
  };

  return (
    <>
      <dialog
        className="modal"
        id="signup-dialog"
        //style={{ display: displaySignUp ? "inline" : "none" }}
      >
        <div className="modalTitle">
          <h3>Please enter your details below.</h3>
        </div>
        <div className="modalBody">
          <form action="" className="signupForm">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="formInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="First Name"
              name="f_name"
              className="formInput"
              value={f_name}
              onChange={(e) => setF_name(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="l_name"
              className="formInput"
              value={l_name}
              onChange={(e) => setL_name(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="formInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="formInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Re-Enter Password"
              name="password-confirm"
              className="formInput"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button
              className="button-green"
              type="submit"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
          <button type="" onClick={handleClose}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
