import Navbar from './Navbar'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [published, setPublished] = useState(false)

    const handlePost = () => {
        console.log('publish')
        return setPublished(true)
    }
    const handleArchive = () => {
        console.log('archive')
        return setPublished(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = {title, message, published}

        fetch('http://localhost:5000/posts/create', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then(() => {
            console.log('new blog added')
        })
        navigate('/')
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
                <div>
                <input type="radio" id="publish" name="published" value="Publish"  onClick={handlePost}/>
                <label htmlFor="publish">Publish</label>
                <input type="radio" id="archive" name="archived" value="Archive" onClick={handleArchive}/>
                <label htmlFor="archive">Archive</label>
                </div>
                <button type="submit" onClick={handlePost}>Post!</button>
            </form>    
    </div>
  );
};

export default CreatePost;