import './App.css'
import { ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute, ProvideAuth } from './hooks/auth'
import Layout from './layouts/Layout'
import Homepage from './views/Homepage'
import NotFound from './views/NotFound'
import Login from './views/auth/Login'
import Signup from './views/auth/Signup'
import Dashboard from './views/dashboard/Dashboard'
import CreateLogbookEntry from './views/logbook/CreateLogbookEntry'
import Logbook from './views/logbook/Logbook'
import ContextProvider from './components/ContextProvider'
import AircraftView from './views/aircraft/AircraftView'
import CreateAircraftEntry from './views/aircraft/CreateAircraftEntry'
import EditAircraftEntry from './views/aircraft/EditAircraftEntry'
import UserSettings from './views/user/UserSettings'
import InstructorPanel from './views/instructor/InstructorPanel'

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
                      <Route path='/dashboard/logbook/:entryId' index element={<Logbook/>}/>
                      <Route path='/dashboard/logbook/create' element={<Logbook createEntry/>}/>
                    </Route>
                    <Route path='/dashboard/aircraft'>
                      <Route index element={<AircraftView/>}/>
                      <Route path='/dashboard/aircraft/create' element={<CreateAircraftEntry/>}/>
                      <Route path='/dashboard/aircraft/edit/:aircraftId' element={<EditAircraftEntry/>}/>
                    </Route>
                    <Route path='/dashboard/instructor/'>
                      <Route index element={<InstructorPanel/>}/>
                      <Route path='/dashboard/instructor/:entryId' element={<InstructorPanel/>}/>
                    </Route>
                  </Route>
              </Route>
              <Route path='/settings' element={<ProtectedRoute/>}>
                  <Route index element={<UserSettings/>}/>
              </Route>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>

      </ProvideAuth>
      
    </BrowserRouter>
  )

}

export default App
