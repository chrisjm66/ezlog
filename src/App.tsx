import './App.css'
import { ReactElement, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute, ProvideAuth } from './hooks/auth'
import Layout from './components/Layout'
import Homepage from './components/Homepage'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <title>ezlog</title>
      <ProvideAuth>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>

            <Route path='/dashboard' element={<ProtectedRoute/>}>
              <Route index element={<Dashboard/>}/>
            </Route>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </ProvideAuth>
      
    </BrowserRouter>
  )

}

export default App
