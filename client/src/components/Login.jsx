/* eslint-disable react/prop-types */
import Navbar from './Navbar'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault();

         fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": username, "password": password})
        })
        .then(res => res.json())
        .then((data) => {
          localStorage.setItem('access', data.accessToken);
          localStorage.setItem('refresh', data.refreshToken);
          navigate('/')
        })

    }

    return (
        <div className="Homepage">
        <Navbar/>
        <h1>Login!</h1>
            <form action="" method="POST" onSubmit={login}>
                <label htmlFor="username">Username:</label>
                <input 
                name="username" 
                id="username" 
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input 
                name="password" 
                id="password" 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button>Login!</button>
            </form> 
        </div>
  );
};

export default Login;