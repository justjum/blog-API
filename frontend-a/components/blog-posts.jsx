import { useState } from "react";

export default function BlogPosts() {
  const requestOptions = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.accessToken,
    },
    mode: "cors",
  };

  fetch("//127.0.0.1:3000/post/", requestOptions).then((response) =>
    response.json().then((data) => {
      console.log(data);
    })
  );
}
