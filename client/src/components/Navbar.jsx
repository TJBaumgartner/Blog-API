/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useState } from "react";



const Navbar = () => {
    const [refreshToken, setRefreshToken] = useState('')
    const fetchToken =  async() => {
        await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: 
            JSON.stringify({"username": "newtest", "password": "1"})
        })
        .then(res => res.json())
        .then(tokens => tokens.refreshToken)
        .then(refreshToken => setRefreshToken(refreshToken))
    }
    const tokenRefresh =  async() => {
        console.log(refreshToken)
        await fetch('http://localhost:5000/token', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: 
            JSON.stringify({"token": refreshToken})
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
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
            <button onClick={fetchToken}>Token made !</button>
            <button onClick={tokenRefresh}>Refresh the Token</button>
        </div>
  );
};

export default Navbar;
