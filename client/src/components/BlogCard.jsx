/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const BlogCard = (props) => {

    const post = props.post;

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

