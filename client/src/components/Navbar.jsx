/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    const adminStatus = localStorage.getItem('admin')
    const logout = async() => {
        await fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"token": localStorage.getItem('refresh')})
        })
        .then((response) => {
            localStorage.clear()
            navigate('/login')
            return response.json()
        })
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
                    <Link to="/posts">
                    View Posts
                    </Link>     
                    {adminStatus === 'true' &&
                    <div>
                    <Link to="/posts/create">
                        Create Post
                    </Link>
                    <Link to="/blogger/posts">
                        Blogger View
                    </Link>
                    </div>
                    }
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
                    <Link to="/posts">
                        View Posts
                    </Link>
                </div>
            }
            <button onClick={logout}>Logout</button>
        </div>
  );
};

export default Navbar;
