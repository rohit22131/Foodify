import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App';
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Header/>
    <App/>
    <Footer/>
    </BrowserRouter>
  </StrictMode>,
)
