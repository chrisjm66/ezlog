import './App.css'
import { ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute, ProvideAuth } from './hooks/auth'
import Layout from './components/Layout'
import Homepage from './components/Homepage'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import CreateLogbookEntry from './components/CreateLogbookEntry'

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
              <Route path='/dashboard/logbook'>
                <Route index element={<div>Logbook</div>}/>
                <Route path='/dashboard/logbook/create' element={<CreateLogbookEntry/>}/>
                
            </Route>
            </Route>

            
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </ProvideAuth>
      
    </BrowserRouter>
  )

}

export default App
