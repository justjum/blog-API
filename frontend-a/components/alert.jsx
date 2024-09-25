import { useState } from "react";

export default function Alert({alertMessage}) {
    const [alertTitle, setAlertTitle] = useState("Oh my.");

    const handleClose = (e) => {
        const dialog = document.getElementById("alert-dialog");
        e.preventDefault();
        dialog.close();
    };
  
    return (
      <>
        <dialog
          id="alert-dialog"
          style={{ backgroundColor: "rgb(238, 187, 187)" }}
        >
          <div className="modalTitle">
            <h3>{alertTitle}</h3>
          </div>
          <div className="modalBody">
            {Array.isArray(alertMessage) ? alertMessage.map((message) => {
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
  