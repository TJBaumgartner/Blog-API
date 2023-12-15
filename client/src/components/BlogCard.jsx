/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
const BlogCard = (props) => {

    const post = props.post;

    const [comments, setComments] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [commentMessage, setCommentMessage] = useState('')

    const getComments = async() => {
        fetch('http://localhost:5000/api/comments')
        .then(response => response.json())
        .then(data => setComments(data))
        if(localStorage.length > 0) {
            setLoggedIn(true)
        }
    }

    useEffect(() => {
        getComments()
        console.log(comments)
    }, [])


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
            getComments()
            setShowForm(false)
            return response.json()
        })
    }

    const ShowForm = () => {
        setShowForm(true)
    }

    return (
         <div className="postCard">
            <h2>{post.title}</h2>
            <p>{post.post}</p>
            <Link to={{
               pathname: `/posts/${post._id}`,
            }}
             >Detail</Link>
         </div>
    );
};

export default BlogCard;

