/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Navbar from './Navbar'


const Blog = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/posts')
        .then(response => response.json())
        .then(data => setPosts(data))
    }, [])
    return (
        <div className="Homepage">
        <Navbar/>
        <h1>Check out the Posts!</h1>
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