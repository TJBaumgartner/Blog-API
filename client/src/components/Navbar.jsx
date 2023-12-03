/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="Navbar"> 
            <Link to="/">
                Home
            </Link>
            <Link to="/posts/create">
                Create Post
            </Link>
            <Link to="/user/create">
                Create User
            </Link>
        </div>
  );
};

export default Navbar;