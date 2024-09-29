import { useState, useEffect } from 'react';

function Post( {newPost, focusPost}) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [keyword, setKeyword] = useState([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [imageThumb, setImageThumb] = useState("");
    const [published, setPublished] = useState("");

    const requestOptions = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.accessToken,
        },
        mode: "cors",
      };

    useEffect(() => {
            if (focusPost) {
                console.log(focusPost)
                setAuthor(focusPost.author.username);
                setTitle(focusPost.title);
                setKeyword(focusPost.keyword);
                setText(focusPost.text);
                setImage(focusPost.image);
                setImageThumb(focusPost.imageThumb);
                setPublished(focusPost.published);
            }
        }, [focusPost]);

    return <>
        <div className='postModal' id="postModal">
            <form action="" className='postForm'>
                <input type="text" className="formInput" placeholder={newPost ? 'Author': ""} defaultValue={author} onChange={(e) => setAuthor(e)}/>
                <input type="text" className="formInput" placeholder={newPost ? 'Title': ""} defaultValue={title} onChange={(e) => setTitle(e)}/>
                <input type="text" className="formInput" placeholder={newPost ? 'Keywords (comma seperated)': ""} defaultValue={keyword} onChange={(e) => setKeyword([e])}/>
                <textarea name="postText" id="postText" className="formInput" placeholder={newPost ? 'Type text here...':""} defaultValue={text}></textarea>
            </form>
        </div>
    </>
}

export default Post;