/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const PostDetail = () => {
    
    const {id} = useParams()


    const [post, setPost] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);
    const [comments, setComments] = useState(null)
    const [showForm, setShowForm] = useState(false);
    const [commentMessage, setCommentMessage] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        const forPost = post._id
        const comment = {commentMessage, forPost}
        fetch('http://localhost:5000/api/comments/create', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(comment)
        })
        .then((response) => {
            console.log('new comment added')
            setShowForm(false)
            GetComments()
            return response.json()
        })
    }

    const ShowForm = () => {
        setShowForm(true)
    }

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
    }, [comments])


    const Log = () => {
        console.log(post.title)
    }

    return (
        <div className="Homepage">
        <Navbar/>
        <button onClick={Log}>ClickMe</button>
        {post &&
        <div>
        <h1>{post.title}</h1>
        <h3>{post.post}</h3>
        </div>
        }
        {(loggedIn === true && showForm === false)  &&
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
            {comments &&
            comments.map((comment) => (
            <div key={comment._id}><p>{comment.comment}</p></div>
            ))}
        {loggedIn == false &&
            <h1><Link to="/login">Login</Link> to comment!</h1>
        }
        </div>
  );
};

export default PostDetail;