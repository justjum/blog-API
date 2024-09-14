import { useState } from "react";
import Logout from "../components/logout";
import Login from "../components/login";

export default function Header({ isLoggedIn, handleLogin, handleSignUp }) {
  return (
    <>
      <div className="header">
        <h1>Blog User Interface</h1>
        {isLoggedIn == true ? (
          <Logout handleLogin={handleLogin} />
        ) : (
          <Login handleLogin={handleLogin} handleSignUp={handleSignUp} />
        )}
      </div>
    </>
  );
}
