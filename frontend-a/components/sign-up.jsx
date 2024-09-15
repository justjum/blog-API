export default function SignUp({ displaySignUp }) {
  const handleClose = (e) => {
    const dialog = document.querySelector("dialog");
    e.preventDefault();
    dialog.close();
  };

  return (
    <>
      <dialog
        className="modal"
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
            />
            <input
              type="text"
              placeholder="First Name"
              name="f_name"
              className="formInput"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="l_name"
              className="formInput"
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="formInput"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="formInput"
            />
            <input
              type="password"
              placeholder="Re-Enter Password"
              name="password-confirm"
              className="formInput"
            />
            <button type="submit" onClick={handleClose}>
              Close
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
