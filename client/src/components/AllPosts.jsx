/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AllPosts = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        fetch('http://localhost:8080/blogger/posts', {        
            headers: {
                'Content-Type': 'text/plain',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
        
        .then((response) => {
            if(response.status === 401 || localStorage.getItem('admin') != 'true'){
                console.log(localStorage)
                navigate('/login');
                alert('Not Authorized')
            }
            return response.json()
        })
        .then(data => setPosts(data))
        if(localStorage.length > 0) {
            setLoggedIn(true)
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const publishPost = (post) => {
        fetch('http://localhost:8080/blogger/posts/publish', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then((res) => {
            console.log('new blog added')
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
            console.log('blog removed')
            res.json()
        })
    }
    return (
        <div className="Homepage">
        <Navbar/>
        <h1>Check out the Posts!</h1>
        {loggedIn == false &&
            <h1><Link to="/login">Login</Link> to comment!</h1>
        }
        {posts ?(
            posts.map((post) => (
                post.isPublished == true ? 
                <div key={post._id}><h1>{post.title}</h1><p>{post.post}</p><button onClick={() => archivePost(post)}>Archive</button></div>
                : 
                <div key={post._id}><h1>{post.title}</h1><p>{post.post}</p><button onClick={() => publishPost(post)}>Publish</button></div>
           ))
           ) : (
               <p>There are no posts</p>
           )}
        </div>
  );
};

export default AllPosts;