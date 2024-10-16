import { useState } from "react";
import Logout from "../components/logout";
import Login from "../components/login";

export default function linkHeader({
  isLoggedIn,
  handleLogin,
  useSignUpPopup,
  setAlertMessage,
}) {
  return (
    <>
      <div className="header links">
        <h3>Full Stack Links...</h3>
        <a href="https://blog-api-frontend-b.jum.au" target="_blank">
          Frontend B (Authors)
        </a>
        <p>...</p>
        <a href="https://jum-blog-api.azurewebsites.net" target="_blank">
          Backend (Blog API)
        </a>
      </div>
    </>
  );
}
