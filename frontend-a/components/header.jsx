import { useState } from "react";
import Logout from "../components/logout";
import Login from "../components/login";

export default function Header({ isLoggedIn, handleLogin }) {
  console.log(isLoggedIn);
  return (
    <>
      <h1>Blog User Interface</h1>
      {isLoggedIn == true ? (
        <Logout handleLogin={handleLogin} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </>
  );
}
