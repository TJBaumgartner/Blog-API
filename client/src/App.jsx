/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import {Route, Routes } from 'react-router-dom';
import Index from './components/Index'
import Blog from './components/Blog'
import ErrorPage from './components/ErrorPage'
import CreatePost from './components/CreatePost'
import Signup from './components/SignUp'
import Login from './components/Login'
import AllPosts from './components/AllPosts'
function App() {
  

  useEffect(()=>{
    setInterval(async () => {
      await fetch('http://localhost:5000/api/token', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            "token": localStorage.getItem('refresh')
          })
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        localStorage.setItem('access', data.accessToken);
      })
    },29000)
  }, [])



  return(
    <div>
      <Routes>
        <Route path="/*" element={<Index/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/posts" element={<Blog 
        />}/>
        <Route path="/user/create" element={<Signup/>}/>
        <Route path="/posts/create" element={<CreatePost/>}/>
        <Route path="/blogger/posts" element={<AllPosts/>}/>
        {/* <Route path="/shop/:name/:item" element={<PurchaseItem/>}/> */}
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
    
  )
}

export default App