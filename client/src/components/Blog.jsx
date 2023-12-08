/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

const Blog = () => {
    const [posts, setPosts] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if(localStorage.length > 0) {
            setLoggedIn(true)
        }
        fetch('http://localhost:5000/posts')
        .then(response => response.json())
        .then(data => setPosts(data))
    }, [])
    return (
        <div className="Homepage">
        <Navbar/>
        <h1>Check out the Posts!</h1>
        {loggedIn == false &&
            <h1><Link to="/login">Login</Link> to comment!</h1>
        }
        {posts ?(
            posts.map((post) => (
                post.isPublished == true ? <div key={post._id}><h1>{post.title}</h1><p>{post.post}</p></div> : null
           ))
           ) : (
               <p>There are no posts</p>
           )}
        </div>
  );
};

export default Blog;