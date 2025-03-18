import './App.css'
import { ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute, ProvideAuth } from './hooks/auth'
import Layout from './views/Layout'
import Homepage from './views/Homepage'
import NotFound from './views/NotFound'
import Login from './views/Login'
import Signup from './views/Signup'
import Dashboard from './views/Dashboard'
import CreateLogbookEntry from './views/CreateLogbookEntry'
import EditLogbookEntry from './views/EditLogbookEntry'
import Logbook from './views/Logbook'
import ContextProvider from './components/ContextProvider'
import AircraftView from './views/AircraftView'


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
                  <Route element={<ContextProvider/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path='/dashboard/logbook'>
                      <Route index element={<Logbook/>}/>
                      <Route path='/dashboard/logbook/create' element={<CreateLogbookEntry/>}/>
                      <Route path='/dashboard/logbook/edit/:entryId' element={<EditLogbookEntry/>}/>
                    </Route>
                    <Route path='/dashboard/aircraft'>
                      <Route index element={<AircraftView/>}/>
                    </Route>
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
