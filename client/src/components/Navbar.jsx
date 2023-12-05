/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";



const Navbar = () => {

    const clear = () => {
        localStorage.clear()
    }
    return (
        <div className="Navbar"> 
            <Link to="/">
                Home
            </Link>
            <Link to="/login">
                Login
            </Link>
            <Link to="/posts/create">
                Create Post
            </Link>
            <Link to="/user/create">
                Create User
            </Link>
            <button onClick={clear}>clear</button>
        </div>
  );
};

export default Navbar;
