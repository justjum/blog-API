import { useState } from "react";
import Login from "./login";
import Logout from "./logout";

function Navbar( {handleLogin, isLoggedIn, setAlertMessage }) {
    return <>
    <div className="navbar">
        {isLoggedIn ? <Logout handleLogin={handleLogin}/>:<Login handleLogin={handleLogin} setAlertMessage={setAlertMessage}/>}
    </div>
    </>
}

export default Navbar;