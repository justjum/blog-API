import { useState, useEffect } from "react";
import dateFormat from "dateformat";
import Post from './post'

export default function BlogPosts({ setAlertMessage, isLoggedIn, setAlertType}) {
  const [posts, setPosts] = useState(null);
  const [newPost, setNewPost] = useState(false);
  const [focusPost, setFocusPost] = useState("");
  const [postForm, setPostForm] = useState(false);


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
  }, [postForm]);

  function handleNewPost() {
    setFocusPost(false);
    setNewPost(true);
    setPostForm(true);
  }

  function handleUpdatePost(post) {
    setFocusPost(post)
    setNewPost(false);
    setPostForm(true);
  }

  function handleCheck(e) {
    const id = e.target.id.split("|");
    console.log(id);

    const requestOptions = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        id: id[0],
        published: !id[1]
      }),
      mode: "cors",
      
    };

    fetch(`//127.0.0.1:3000/post/${id[0]}/isPublished`, requestOptions).then((response) =>
      response.json().then((data) => {
        const alertDialog = document.getElementById("alert-dialog");
        console.log(data);
        setAlertType(data.alert);
        if (data.error) {
          console.log(data.error);
          setAlertMessage(data.error);
          alertDialog.showModal();
        } else {
          e.target.checked = data.published;
        }
      })
    );
  }

  return (
    <>
      <section
        id="blogPostTable"
        className="center"
      >
        {
          isLoggedIn ? (posts ? ( <>
            <button onClick={handleNewPost}>New Post</button>
            <hr />
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
                  <tr key={post.id} className="hover">
                    <td onClick={()=>{handleUpdatePost(post)}}>{post.title}</td>
                    <td onClick={()=>{handleUpdatePost(post)}}>{post.author.username}</td>
                    <td onClick={()=>{handleUpdatePost(post)}}>{dateFormat(post.createdAt)}</td>
                    <td>
                      <label className="switch" >
                        <input type="checkbox" name={'check-'+post.id} id={post.id+'|'+post.published} onChange={handleCheck} checked={post.published}/>
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                </>
              })}
              </tbody>

            </table>
            <hr />
            
            {postForm ? <Post newPost={newPost} focusPost={focusPost} setAlertMessage={setAlertMessage} setPostForm={setPostForm} setAlertType={setAlertType}/>:""}
          </>

        ) : "") :
        (
          <p>Log in to access Blog Backend</p>
        )}

      </section>

    </>
  );
}

//{post.published ? "Yes" : "No"}