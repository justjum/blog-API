import { useState, useEffect } from 'react';

function Post( {newPost, focusPost, setAlertMessage}) {
    const [id, setId] = useState("")
    const [title, setTitle] = useState("");
    const [keyword, setKeyword] = useState([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [imageThumb, setImageThumb] = useState("");
    const [published, setPublished] = useState("");

    const handleClose = (e) => {
        const dialog = document.getElementById("post-dialog");
        dialog.close();
      };

    useEffect(() => {
        const dialog = document.getElementById("post-dialog");
        dialog.showModal();
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
                setPublished("");
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
                <input type="text" className="formInput" name="image" placeholder={newPost ? 'Link...':""} value={image} onChange={(e)=>setImage(e.target.value)} />
                <label htmlFor="imageThumb"><strong>Image Thumbnail:</strong></label>
                <input type="text" className="formInput" name="imageThumb" placeholder={newPost ? 'Link...':""} value={imageThumb} onChange={(e) =>setImageThumb(e.target.value)} />
                <label htmlFor=""><strong>Published:</strong></label>
                <label className="switch" >
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
                <button onClick={handlePost}>{newPost ? "Save Post": "Update Post"}</button>
            </form>
        </dialog>
    </>
}

export default Post;