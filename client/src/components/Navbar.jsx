/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="Navbar"> 
            <Link to="/">
                Home
            </Link>
            <Link to="/posts/create">
                CreatePost
            </Link>
        </div>
  );
};

export default Navbar;