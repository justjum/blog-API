import { useState, useEffect } from "react";
import dateFormat from "dateformat";
import Post from './post'

export default function BlogPosts({ setAlertMessage, isLoggedIn }) {
  const [posts, setPosts] = useState(null);
  const [newPost, setNewPost] = useState(false);
  const [focusPost, setFocusPost] = useState("");

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
        console.log(posts);
      })
    );
  }, []);


  return (
    <>
      <section
        id="blogPostTable"
        className="center"
      >
        {
          isLoggedIn ? (posts ? (
            <table className="postsTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Created</th>
                  <th>Published</th>
                </tr>
              </thead>
              <tbody>
              {posts.map((post) => {
                return <>
                  <tr key={post.id} onClick={()=>{setFocusPost(post)}} className="hover">
                    <td>{post.title}</td>
                    <td>{post.author.username}</td>
                    <td>{dateFormat(post.createdAt)}</td>
                    <td>{post.published ? "Yes" : "No"}</td>
                  </tr>
                </>
              })}
              </tbody>

            </table>
        ) : "") :
        (
          <p>Log in to access Blog Backend</p>
        )}
      </section>
      <hr />
      <button >New Post</button>
      <Post newPost={newPost} focusPost={focusPost} />
    </>
  );
}
