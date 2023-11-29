/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'

function App() {

  const [backendData, setbackendData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/api").then(
      response => response.json()
    ).then(
      data => {
        setbackendData(data)
      }
    )
  }, [])
  
  return(
    <div>
      {(typeof backendData.users === 'undefined') ? (
        <p>Loading</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
    </div>
  )
}

export default App