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
          //style={{ display: displaySignUp ? "inline" : "none" }}
        >
          <div className="modalTitle">
            <h3>{alertTitle}</h3>
          </div>
          <div className="modalBody">
            <p>{alertMessage}</p>
              <button type="submit" onClick={handleClose}>
                Close
              </button>
          </div>
        </dialog>
      </>
    );
  }
  