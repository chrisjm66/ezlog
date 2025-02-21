import { ReactElement, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'
import Homepage from './components/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Homepage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
