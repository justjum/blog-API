import { useState } from "react";

export default function AddComment({ postId, setAlertMessage, setAddComment }) {
  const [commentText, setCommentText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();
    console.log(e.target.form);

    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        text: commentText,
        postId: postId,
      }),
      mode: "cors",
    };

    console.log(requestOptions);

    fetch(
      `${import.meta.env.VITE_CONNECT}/post/${postId}/comment/`,
      requestOptions
    ).then((response) =>
      response.json().then((data) => {
        console.log(data);
        if (data.error) {
          const alertDialog = document.getElementById("alert-dialog");
          setAlertMessage(data.error);
          alertDialog.showModal();
        } else {
          setAddComment(false);
        }
      })
    );
  };

  return (
    <div className="add-comment center">
      <form action="">
        <textarea
          name="text"
          id="comment-text"
          placeholder="Type your comment here..."
          rows="4"
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button type="submit" className="button-green" onClick={handleComment}>
          Save Comment
        </button>
      </form>
    </div>
  );
}
