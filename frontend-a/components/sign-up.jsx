export default function SignUp({ handleSignUp, displaySignUp }) {
  console.log(displaySignUp);
  return (
    <>
      <div
        className="alert"
        style={{ display: displaySignUp ? "inline" : "none" }}
      >
        <div className="alertTitle">
          <h3>Please enter your details below.</h3>
        </div>
        <div className="alertBody">
          <form action="" className="form">
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
          </form>
        </div>
      </div>
    </>
  );
}
