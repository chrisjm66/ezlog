import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'


if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = "http://localhost:8100"
} else {
  axios.defaults.baseURL = "https://localhost:8100"
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
