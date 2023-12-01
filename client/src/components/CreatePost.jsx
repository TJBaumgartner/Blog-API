import Navbar from './Navbar'
import {useState} from 'react'

const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = {title, message}

        fetch('http://localhost:5000/posts/create', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then(() => {
            console.log('new blog added')
        })
    }
  return (
    <div>
        <Navbar/>
        <h1>Create a post!</h1>
            <form action="" method="POST" onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input 
                name="title" 
                id="title" 
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="message">Message:</label>
                <input 
                name="message" 
                id="message" 
                type="text"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Post!</button>
            </form>    
    </div>
  );
};

export default CreatePost;