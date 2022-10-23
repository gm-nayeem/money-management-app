import React from 'react'
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Test from './pages/Error'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
