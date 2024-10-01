import { useState } from "react";

export default function Alert({alertMessage, alertType}) {

    const handleClose = (e) => {
        const dialog = document.getElementById("alert-dialog");
        e.preventDefault();
        dialog.close();
    };

    console.log(alertType)
  
    return (
      <>
        <dialog
          id="alert-dialog"
          style={{ backgroundColor: alertType ? "rgb(238, 187, 187)": "rgb(220, 230, 226)" }}
        >
          <div className="modalTitle">
            <h3>{alertType ? "Oh my.":"Ok!"}</h3>
          </div>
          <div className="modalBody">
            {Array.isArray(alert) ? alert.map((message) => {
              console.log("now")
              return (
                <p>{message.msg}</p>
              )
            }):<p>{alertMessage}</p>}
            
            <button type="submit" onClick={handleClose}>
              Close
            </button>
          </div>
        </dialog>
      </>
    );
  }
  