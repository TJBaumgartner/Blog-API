/* eslint-disable react/prop-types */
import Navbar from './Navbar'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const login = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": username, "password": password})
        })
        .then((response) => {
            if(response.status === 400){
                setPasswordError(false)
                setPassword('')
                return setUsernameError(true)
            }
            if(response.status === 403){
                setUsernameError(false)
                setPassword('')
                return setPasswordError(true)
            }
            return response.json()
        })
        .then((data) => {
            localStorage.setItem('access', data.accessToken);
            localStorage.setItem('refresh', data.refreshToken);
            localStorage.setItem('admin', data.admin);
            localStorage.setItem('name', data.name)
            console.log(localStorage)
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
            {usernameError === true &&
            <h2>
            Incorrect Username
            </h2>
            }
            {passwordError === true &&
            <h2>
            Incorrect Password
            </h2>
            }
            <h1>Don`t have an account? <Link to="/user/create">Sign Up!</Link></h1>
        </div>
  );
};

export default Login;