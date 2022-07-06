import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'

import { Welcome } from './pages/Welcome'
import { Offices } from './pages/Offices'
import { Shipments } from './pages/Shipments'

import { Navigation } from './components/Navigation'

import './App.css'

const App = () => (
    <Box className="App" sx={{ display: 'flex' }}>
      <Navigation />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          marginTop: '64px'
        }}
      >
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/offices" element={<Offices/>} />
          <Route path="/shipments" element={<Shipments/>} />
        </Routes>
      </Box>
    </Box>
)

export default App
