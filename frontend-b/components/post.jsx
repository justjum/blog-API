import { useState, useEffect } from 'react';
import UploadWidget from './uploadWidget';
import Comments from './comments'

function Post( {newPost, focusPost, setAlertMessage, setPostForm, setAlertType, setDeleteConfirm }) {
    const [id, setId] = useState("")
    const [title, setTitle] = useState("");
    const [keyword, setKeyword] = useState([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [imageThumb, setImageThumb] = useState("");
    const [published, setPublished] = useState("");

    const handleClose = (e) => {
      setPostForm(false)
      const dialog = document.getElementById("post-dialog");
      dialog.close();
    };

    const handleCheck = () => {
      setPublished(!published)
    }

    const handleDelete = (e, id) => {
      e.preventDefault();
      console.log(id)
      localStorage.setItem("deleteId", id);
      setAlertMessage("Are you sure you want to delete this post?");
      setAlertType(true);
      setDeleteConfirm(true);
      const alertDialog = document.getElementById("alert-dialog");
      alertDialog.showModal(id);
    }

    const handleComments = (e) => {
      e.preventDefault()
      const dialog = document.getElementById("comment-dialog");
      dialog.showModal();
    }

    useEffect(() => {
        const dialog = document.getElementById("post-dialog");
        dialog.show();
      }, [focusPost])

    useEffect(() => {
            if (focusPost) {
                setId(focusPost.id)
                setTitle(focusPost.title);
                setKeyword(focusPost.keyword);
                setText(focusPost.text);
                setImage(focusPost.image);
                setImageThumb(focusPost.imageThumb);
                setPublished(focusPost.published);
            } else {
                setId("")
                setTitle("");
                setKeyword([]);
                setText("");
                setImage("");
                setImageThumb("");
                setPublished(false);
            }
        }, [focusPost]);

        const handlePost = (e, form) => {
            e.preventDefault();
            const requestOptions = {
                method: newPost ? "post":"put",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({
                  id: newPost ? "": id,
                  title: title,
                  keyword: keyword,
                  text: text,
                  image: image, 
                  imageThumb: imageThumb,
                  published: published
                }),
                mode: "cors",
                
              };
            
              fetch(`//127.0.0.1:3000/post/${id}`, requestOptions).then((response) =>
                response.json().then((data) => {
                  const alertDialog = document.getElementById("alert-dialog");
                  console.log(data);
                  setAlertType(data.alert);
                  if (data.error) {
                    console.log(data.error);
                    setAlertMessage(data.error);
                    alertDialog.showModal();
                  } else {
                    setAlertMessage(data.msg);
                    handleClose();
                    alertDialog.showModal();
                  }
                })
              );
            };

    return <>
        <dialog className='post-dialog' id="post-dialog">
            <button onClick={handleClose}>Close</button>
            <form action="" className='postForm'>
                <input type="hidden" name="id" value={id} />
                <label htmlFor="title"><strong>Title:</strong></label>
                <input type="text" className="formInput" name="title" placeholder={newPost ? 'Title': ""} value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="keywords"><strong>Keywords:</strong></label>
                <input type="text" className="formInput" name="keywords" placeholder={newPost ? 'Keywords (comma seperated)': ""} value={keyword} onChange={(e) => setKeyword([e.target.value])}/>
                <label htmlFor="postText"><strong>Text:</strong></label>
                <textarea name="postText" id="postText" className="formInput" placeholder={newPost ? 'Type text here...':""} value={text} onChange={(e)=>setText(e.target.value)}></textarea>
                <label htmlFor="image"><strong>Image:</strong></label>
                <div> 
                  <img className='postImageThumb center' src={image} alt="" />
                  <UploadWidget image={image} setImage={setImage} setImageThumb={setImageThumb} />
                </div>
                <a type="text" className="formInput" name="image" href={image} >
                  {image}
                </a>
                
                <label htmlFor=""><strong>Published:</strong></label>
                <label className="switch" >
                    <input type="checkbox" onChange={handleCheck} checked={published}/>
                    <span className="slider round"></span>
                </label>
                <button className="postButton" onClick={handleComments}>Comments</button>
                <div>
                  <button className="postButton" onClick={handlePost}>{newPost ? "Save Post": "Update Post"}</button>
                  <button className="postButton delete" onClick={newPost ? handleClose:() => handleDelete(event, id)}>{newPost ? "Cancel Post":"Delete Post"}</button>
                </div>
                
            </form>
        </dialog>
        <Comments postId={id} setPostId={setId}/>
        
    </>
}

export default Post;