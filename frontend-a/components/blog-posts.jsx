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
        console.log(data);
        setPosts(data);
      })
    );
  }, []);

  return (
    <>
      <ul>
        {posts
          ? posts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="card-title">
                  <h3>{post.title}</h3>
                </div>
                <div className="card-body">
                  <p>{post.text}</p>
                </div>
              </div>
            ))
          : ""}
      </ul>
    </>
  );
}
