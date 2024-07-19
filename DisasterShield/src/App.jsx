import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/sidebar'
import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
function App() {
  return (
    <>
      <Router>
      <Navbar />
      <Routes></Routes>
      </Router>
      
    </>
  )
}

export default App
