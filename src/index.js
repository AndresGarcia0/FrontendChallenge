import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const mdTheme = createTheme()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={mdTheme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
