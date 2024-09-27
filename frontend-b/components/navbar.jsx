import { useState } from "react";
import Login from "./login";
import Logout from "./logout";

function Navbar( {handleLogin, isLoggedIn }) {
    return <>
    <div>
        {isLoggedIn ? <Logout handleLogin={handleLogin}/>:<Login handleLogin={handleLogin}/>}
        
    </div>
    </>
}

export default Navbar;