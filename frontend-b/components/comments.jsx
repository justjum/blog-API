import { useState, useEffect} from "react";
import Delete from '../src/delete-outline.svg'

function Comments({postId, setPostId}) {
    const [comments, setComments] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    function handleClose(e) {
        const dialog = document.getElementById("comment-dialog");
        e.preventDefault();
        dialog.close();
    }

    function handleDelete(e) {
        setDeleteId('/'+e.target.id);  
        
    }

    const url = `${import.meta.env.VITE_CONNECT}/post/${postId}/comment`;

    const requestOptions = {
        method: deleteId? 'delete':'get',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        mode: "cors",
      };

    useEffect(() => {
    fetch(
            deleteId ? url+deleteId:url,
            requestOptions
        ).then((response) =>
            response.json()
        .then((data) => {
                if (!data.msg) {
                    setComments(data)
                } else {
                    setDeleteId(null);
                    setPostId(postId);
                }
                    
            })
            
        )
    }, [postId, deleteId]);
    
    return <>
        <dialog className='comment-dialog' id="comment-dialog">
            <div className='modalTitle'>
            <button type="submit" onClick={handleClose}>
              Close
            </button>
                <h3>Post Comments</h3>
            </div>
            <div className='modalBody'>
            {Array.isArray(comments) ? (<table className="commentTable center">
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
                            <tr className="hover" key={comment.id}>
                                <td style={{textAlign:"left"}}>{comment.text}</td>
                                <td>{comment.author.username}</td>
                                <td><button onClick={handleDelete}><img className='icon' src={Delete} alt="delete comment" id={comment.id}/></button></td>
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