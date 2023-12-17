/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const PostDetail = () => {
    const navigate = useNavigate()

    const {id} = useParams()


    const [post, setPost] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);
    const [comments, setComments] = useState(null)

    const GetComments = () => {
        fetch(`http://localhost:5000/api/posts/${id}/comments`)
        .then(response => response.json())
        .then(data => setComments(data))
        if(localStorage.length > 0) {
            setLoggedIn(true)
        }
    }
    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${id}`)
        .then(response => response.json())
        .then(data => setPost(data))
        if(localStorage.length > 0) {
            setLoggedIn(true)
        }
        GetComments()
    }, [])

    const publishPost = (post) => {
        fetch('http://localhost:8080/blogger/posts/publish', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then((res) => {
            console.log('blog published')
            res.json()
        })
    }

    const archivePost = (post) => {
        fetch('http://localhost:8080/blogger/posts/archive', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then((res) => {
            console.log('blog archived')
            res.json()
        })
    }

    const deletePost = (post) => {
        fetch(`http://localhost:8080/blogger/posts/${id}/delete`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then((res) => {
            console.log('blog deleted')
            res.json()
            navigate('/blogger/posts')
        })
    }

    const deleteComment = (commentID) => {
        fetch(`http://localhost:8080/blogger/posts/${id}/comments/${commentID}/delete`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then((res) => {
            console.log('comment deleted')
            res.json()
            navigate('/blogger/posts')
        })
    }

    return (
        <div className="Homepage">
        <Navbar/>
        {post ?(
            post.isPublished == true ? 
            <div key={post._id}>
                <h1>{post.title}</h1><p>{post.post}</p><button onClick={() => archivePost(post)}>Archive</button>
                <button onClick={() => deletePost()}>Delete</button>
            </div>
                : 
            <div key={post._id}>
                <h1>{post.title}</h1><p>{post.post}</p><button onClick={() => publishPost(post)}>Publish</button>
                <button onClick={() => deletePost()}>Delete</button>
            </div>
        ) : (
            <p>There are no posts</p>
        )}
        {/* {(loggedIn === true && showForm === false)  &&
            <button className="" onClick={() => ShowForm()}>Comment</button>
            }
            {showForm === true &&
            <div>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <label htmlFor="message">Message:</label>
                    <input 
                    name="message" 
                    id="message" 
                    type="text"
                    required
                    value={commentMessage}
                    onChange={(e) => setCommentMessage(e.target.value)}
                    />            
                    <button type="submit">Post Comment!</button>
                </form>      
                <h1 onClick={() => setShowForm(false)}>X</h1> 
            </div>         
            }
             */}
            {comments &&
                comments.map((comment) => (
                <div key={comment._id}>
                    <p>{comment.comment}</p>
                    <button onClick={() => deleteComment(comment._id)}>Delete comment</button>
                </div>
                
            ))}
        {loggedIn == false &&
            <h1><Link to="/login">Login</Link> to comment!</h1>
        }
        </div>
  );
};

export default PostDetail;