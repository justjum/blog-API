import { useState, useEffect } from "react";

export default function BlogPosts() {
  const [posts, setPosts] = useState(null);
  const [focusPost, setFocusPost] = useState(null);
  const [comments, setComments] = useState(null);

  let requestOptions = {
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
        console.log(posts);
      })
    );
  }, []);

  useEffect(() => {
    focusPost
      ? fetch(
          `//127.0.0.1:3000/post/${focusPost.id}/comment`,
          requestOptions
        ).then((response) =>
          response.json().then((data) => {
            setComments(data);
          })
        )
      : "";
  }, [focusPost]);

  const handleFocusPost = (e) => {
    e.preventDefault();
    setFocusPost(posts.find((post) => post.id == e.target.id));
  };

  const handleClosePost = () => {
    setFocusPost(null);
  };

  return (
    <>
      <section id="blogPosts" className="center">
        {posts ? (
          focusPost ? (
            <>
              <div className="post-card center" key={focusPost.id}>
                <div className="card-title">
                  <h3>{focusPost.title}</h3>
                </div>
                <div className="card-body">
                  <p>{focusPost.text}</p>
                </div>
                <div className="card-comments">
                  {comments
                    ? comments.map((comment) => {
                        return (
                          <>
                            <p>{comment.text}</p>
                            <p>{comment.userId}</p>
                            <p>{comment.createdAt}</p>
                          </>
                        );
                      })
                    : ""}
                </div>
                <div>
                  <button className="formInput" onClick={handleClosePost}>
                    Back
                  </button>
                </div>
              </div>
            </>
          ) : (
            posts.map((post) => {
              return post.published ? (
                <div className="post-card center" key={post.id}>
                  <div className="card-title">
                    <h3>{post.title}</h3>
                  </div>
                  <div className="card-body">
                    <p>{post.text}</p>
                  </div>
                  <div>
                    <button
                      className="formInput"
                      id={post.id}
                      onClick={handleFocusPost}
                    >
                      Full Post
                    </button>
                  </div>
                </div>
              ) : (
                ""
              );
            })
          )
        ) : (
          <>
            <span>This</span>
            <p>"No posts"</p>
          </>
        )}
      </section>
    </>
  );
}
