import Navbar from './Navbar'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [matchPassword, setMatchPassword] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password === confirmPassword){

            const user = {username, password}

            fetch('http://localhost:5000/user/create', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            })
            .then(() => {
                console.log('new user added')
            })
            navigate('/')
        } else {
            setMatchPassword(false)
            return;
        }
    }
  return (
    <div>
        <Navbar/>
        <h1>Create user!</h1>
            <form action="" method="POST" onSubmit={handleSubmit}>
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
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input 
                name="confirmPassword" 
                id="confirmPassword" 
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Create User!</button>
            </form>    
            {matchPassword === false &&
                <h2>Passwords must match</h2>
            }    
      </div>
  );
};

export default SignUp;