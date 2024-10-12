import { useState, useEffect } from "react";
import dateFormat from "dateformat";
import AddComment from "../components/add-comment";
import KeywordFilter from "./keyword-filter";

export default function BlogPosts({ setAlertMessage, isLoggedIn }) {
  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [focusPost, setFocusPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [addComment, setAddComment] = useState(false);
  const [keyword, setKeyword] = useState(null);

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
        setFilteredPosts(data);
      })
    );
  }, []);

  useEffect(() => {
    if (keyword !== null) {
      console.log(keyword);
      setFilteredPosts(
        posts.filter((post) => post.keyword.toString().includes(keyword))
      );
    }
    console.table(posts);
    console.table(filteredPosts);
  }, [keyword]);

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
  }, [focusPost, addComment]);

  const handleFocusPost = (e) => {
    e.preventDefault();
    setFocusPost(posts.find((post) => post.id == e.target.id));
  };

  const handleClosePost = () => {
    setFocusPost(null);
  };

  const handleComment = () => {
    setAddComment(true);
  };

  return (
    <>
      {focusPost ? "" : <KeywordFilter setKeyword={setKeyword} />}
      <section
        id="blogPosts"
        className={focusPost != null ? "focusPost" : "center"}
      >
        {posts ? (
          focusPost ? (
            <>
              <button className="formInput right" onClick={handleClosePost}>
                Back
              </button>
              <div className="post-card-focus center" key={focusPost.id}>
                <div className="card-title">
                  <h2>{focusPost.title}</h2>
                </div>
                <div className="post-image">
                  <img src={focusPost.image} alt="" />
                </div>
                <div className="card-body">
                  <p>{focusPost.text}</p>
                </div>
                <hr />
                <h3>Comments</h3>
                <div className="card-comments">
                  {comments
                    ? comments.map((comment) => {
                        console.log(comment);
                        return (
                          <div className="comment-card center">
                            <p className="comment-text center">
                              {comment.text}
                            </p>
                            <p className="right smfont">
                              {comment.author.username}
                            </p>
                            <p className="right smfont">
                              {dateFormat(comment.createdAt)}
                            </p>
                          </div>
                        );
                      })
                    : ""}
                </div>
                {isLoggedIn ? (
                  addComment ? (
                    <AddComment
                      setAlertMessage={setAlertMessage}
                      postId={focusPost.id}
                      setAddComment={setAddComment}
                    />
                  ) : (
                    <button className="button-green" onClick={handleComment}>
                      Add Comment
                    </button>
                  )
                ) : (
                  ""
                )}
                <div>
                  <button className="formInput" onClick={handleClosePost}>
                    Back
                  </button>
                </div>
              </div>
            </>
          ) : (
            filteredPosts.map((post) => {
              return post.published ? (
                <div className="post-card center" key={post.id}>
                  <div className="card-image">
                    <a href="">
                      <img src={post.imageThumb} alt="" />
                    </a>
                  </div>
                  <div className="card-body">
                    <h3>{post.title}</h3>
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
            <p>"No posts"</p>
          </>
        )}
      </section>
    </>
  );
}
