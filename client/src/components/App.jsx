import { Outlet } from 'react-router-dom'
import React from 'react'
import Navbar from './Navbar'

function App() {


  return (
    <div>
      <Navbar />
      <div className="main-header">
        <img id="main-logo" width={170} height={170} src="src/assets/letterboxdinlogofinal.png" />
        <h1 id="main-title" >Letterboxd In</h1>
      </div>

      <Outlet />

    </div>
  )
}

export default App