/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import {Route, Routes } from 'react-router-dom';
import Index from './components/Index'
import Blog from './components/Blog'
import ErrorPage from './components/ErrorPage'

function App() {

  const [backendData, setbackendData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/api")
    .then(response => response.json())
    .then(
      data => {
        setbackendData(data)
      }
    )
  }, [])
  
  const handleGet = (e) => {
    fetch('http://localhost:5000')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  return(
    <div>
      {(typeof backendData.users === 'undefined') ? (
        <p>Loading</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
      <button onClick={handleGet}>Click me for index</button>
      <Routes>
        <Route path="/*" element={<Index/>}/>
        <Route path="/blog" element={<Blog/>}/>
        {/* <Route path="/shop/:name/:item" element={<PurchaseItem/>}/> */}
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
    
  )
}

export default App