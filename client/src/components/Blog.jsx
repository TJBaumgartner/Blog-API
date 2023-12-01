/* eslint-disable react/prop-types */
import Navbar from './Navbar'


const Blog = (props) => {
    return (
        <div className="Homepage">
        <h1>Welcome to the Blog</h1>
        <Navbar/>
            {(typeof props.blogPosts.users === 'undefined') ? (
        <p>Loading</p>
      ) : (
        props.blogPosts.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
        </div>
  );
};

export default Blog;