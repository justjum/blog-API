import { useState } from "react";

export default function Alert({alertMessage, alertType, deleteConfirm, setDeleteConfirm}) {

    const handleClose = (e) => {
        const dialog = document.getElementById("alert-dialog");
        deleteConfirm ? setDeleteConfirm(false):"";
        e.preventDefault();
        dialog.close();
    };

    const handleConfirm = (e) => {
      const dialog = document.getElementById("alert-dialog");
      const id = localStorage.getItem('deleteId');
      setDeleteConfirm(false);
      const requestOptions = {
        method: 'delete',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        mode: "cors",
      };
      fetch(
        `${import.meta.env.VITE_CONNECT}/post/${id}`,
        requestOptions
        ).then((response) =>
        response.json()
        .then((data) => {
            if(data.msg) {
              const dialog = document.getElementById("post-dialog");
              dialog.close();
            } else {
              console.log(data.err)
            }
                
        })
        
    )
      dialog.close();
    }

    
  
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
            {deleteConfirm ? 
              <button className="postButton" onClick={handleConfirm}>Confirm</button>
              :
              ""}
            <button type="submit" onClick={handleClose}>
              {deleteConfirm ? "Cancel" : "Close"}
            </button>
          </div>
        </dialog>
      </>
    );
  }
  