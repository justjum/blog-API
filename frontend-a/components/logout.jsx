function Logout({ handleLogin }) {
  function onLogout() {
    localStorage.removeItem("accessToken");
    handleLogin();
  }

  return (
    <>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}

export default Logout;
