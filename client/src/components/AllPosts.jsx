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
    }, [posts])

    return (
        <div className="Homepage">
        <Navbar/>
        <h1>Post Manager</h1>
        {loggedIn == false &&
            <h1><Link to="/login">Login</Link> to comment!</h1>
        }
        {posts ?(
            posts.map((post) => (
                post.isPublished == true ? 
                <div key={post._id}>
                <h1>{post.title}</h1><p>{post.post}</p>
                <Link to={{
                pathname: `/blogger/posts/${post._id}`,
                }}
                >Detail</Link>
                </div>
                : 
                <div key={post._id}>
                <h1>{post.title}</h1><p>{post.post}</p>
                <Link to={{
                pathname: `/blogger/posts/${post._id}`,
                }}
                >Detail</Link>
                </div>
           ))
           ) : (
               <p>There are no posts</p>
           )}
        </div>
  );
};

export default AllPosts;