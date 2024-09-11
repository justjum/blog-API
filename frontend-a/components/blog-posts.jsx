import { useState, useEffect } from "react";

export default function BlogPosts() {
  const [posts, setPosts] = useState(null);

  const requestOptions = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.accessToken,
    },
    mode: "cors",
  };

  useEffect(() => {
    fetch("//127.0.0.1:3000/post/", requestOptions).then((response) =>
      response.json().then((data) => {
        setPosts(data);
      })
    );
  }, []);

  return (
    <>
      <ul>
        {posts
          ? posts.map((post) => (
              <li key={post.id}>
                {post.title} {post.text}
              </li>
            ))
          : ""}
      </ul>
    </>
  );
}
