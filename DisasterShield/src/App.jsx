import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/sidebar'
import Login from './pages/login'
import SignUp from './pages/signin'
import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import Map from './pages/map'
import HelpSideBar from './components/help-sidebar'
import Missing from './pages/missing'
import HelpAndServicePage from './pages/helpAndService'
import { Toaster } from 'sonner'
import Information from './pages/information'
import Emergency from './pages/emergency'
function App() {
  return (
    <>
      <Router>
      <Navbar />
      <Toaster richColors position='top-right'/>
      <Routes>
        <Route path='/emergency' element={<Emergency />}/>
        <Route path='/missing' element={<Missing />} />
        <Route path='/help' element={<HelpAndServicePage />}/>
        <Route path='/signin' element={<Login />}/>
        <Route path='/register' element={<SignUp />}/>
        <Route path='/' element={<Map />}/>
      </Routes>
      </Router>
      
    </>
  )
}

export default App
