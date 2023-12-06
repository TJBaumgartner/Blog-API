/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'


const Navbar = () => {

    const clear = () => {
        localStorage.clear()
    }
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        if(localStorage.length > 0){
            setLoggedIn(true)
        }
    }, [])

    return (
        <div className="Navbar"> 
            {loggedIn === true &&
                <div>
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/posts/create">
                        Create Post
                    </Link>
                </div>
            }
            {loggedIn === false &&
                <div>
                    <Link to="/login">
                        Login
                    </Link>
                    <Link to="/user/create">
                        Create User
                    </Link>
                </div>
            }
            <button onClick={clear}>clear</button>
        </div>
  );
};

export default Navbar;
