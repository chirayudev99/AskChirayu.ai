import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
const API_URL = import.meta.env.VITE_API_URL;


axios.defaults.baseURL = API_URL
axios.defaults.withCredentials = true
const theme = createTheme({
  typography:{
fontFamily:"Space Grotesk, sans-serif",
allVariants:{color:"#eef7f2"}
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme} >
      <Toaster position='top-right' />
    <App />
     
    </ThemeProvider>
    </BrowserRouter>
 
   
  </React.StrictMode>,
)
