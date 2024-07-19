import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/sidebar'
import Login from './pages/login'
import SignUp from './pages/signin'
import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import Map from './pages/map'
function App() {
  return (
    <>
      <Router>

      <Navbar />
      <Routes>
        <Route path='/signin' element={<Login />}/>
        <Route path='/register' element={<SignUp />}/>
        <Route path='/' element={<Map />}/>
      </Routes>
      </Router>
      
    </>
  )
}

export default App
