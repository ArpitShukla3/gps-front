import './App.css'
import { Route, Routes } from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import Auth from './Auth/Auth';
import Dashboard from './MainPage/Dashboard';
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  useEffect(() => {
  }, [])
  return(
    <>
     <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/auth" element={<Auth/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      
    </Routes>
    </>
  )
  
}

export default App