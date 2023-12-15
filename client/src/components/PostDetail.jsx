/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const PostDetail = () => {
    const {id} = useParams()




    const [post, setPost] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${id}`)
        .then(response => response.json())
        .then(data => setPost(data))
        if(localStorage.length > 0) {
            setLoggedIn(true)
        }
    }, [])
    const Log = (  ) => {
        console.log(post)
    }
    return (
        <div className="Homepage">
        <Navbar/>
        <h1>{post.title}</h1>
        <h3>{post.post}</h3>
        <h1 onClick={Log}>Log me</h1>
        {loggedIn == false &&
            <h1><Link to="/login">Login</Link> to comment!</h1>
        }
        </div>
  );
};

export default PostDetail;