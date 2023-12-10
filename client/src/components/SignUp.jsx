import Navbar from './Navbar'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userTaken, setUserTaken] = useState(false)
    const [matchPassword, setMatchPassword] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();


        const user = {username, password}
        if(password === confirmPassword){
            console.log('password')
            fetch('http://localhost:5000/api/user/create', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            })
            .then((response) => {
                if(response.status === 400){
                    setPassword('')
                    return setUserTaken(true)
                }
                response.json()
                return navigate('/')
            })
            .then((data) => {
                console.log(data)
            })
        } else {
            setMatchPassword(false)
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
            {userTaken === true &&
                <h2>Username is taken</h2>
            }  
      </div>
  );
};

export default SignUp;




// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!
// trying to make create user not duplicate usernames!!