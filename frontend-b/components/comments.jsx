import { useState, useEffect} from "react";
import Delete from '../public/delete-outline.svg'

function Comments({postId}) {
    const [comments, setComments] = useState(undefined);

    function handleClose(e) {
        const dialog = document.getElementById("comment-dialog");
        e.preventDefault();
        dialog.close();
    }

    let requestOptions = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.accessToken,
        },
        mode: "cors",
      };

    useEffect(() => {
    fetch(
            `//127.0.0.1:3000/post/${postId}/comment`,
            requestOptions
        ).then((response) =>
            response.json().then((data) => {
                console.log(data);
                setComments(data);
                console.log(comments);
            })
            
        )
    }, [postId]);
    
    return <>
        <dialog className='comment-dialog' id="comment-dialog">
            <div className='modalTitle'>
            <button type="submit" onClick={handleClose}>
              Close
            </button>
                <h3>Post Comments</h3>
            </div>
            <div className='modalBody'>
            {Array.isArray(comments) ? (<table>
                <thead>
                    <tr>
                        <th>Comment</th>
                        <th>Author</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment)=> {
                        return <>
                            <tr>
                                <td>{comment.text}</td>
                                <td>{comment.author.username}</td>
                                <td><img src={Delete} alt="delete comment" /></td>
                            </tr>
                        </>
                    })}
                </tbody>
            </table>) : "No comments"}
            </div>

        </dialog>
    </>
}

export default Comments;