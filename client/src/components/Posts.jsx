/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

const AllPosts = () => {
    const [posts, setPosts] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/blogger/posts')
        .then(response => response.json())
        .then(data => setPosts(data))
        if(localStorage.length > 0) {
            setLoggedIn(true)
        }
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
                <div key={post._id}><h1>{post.title}</h1><p>{post.post}</p></div>
           ))
           ) : (
               <p>There are no posts</p>
           )}
        </div>
  );
};

export default AllPosts;