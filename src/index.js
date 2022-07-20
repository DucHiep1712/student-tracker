import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import './index.css'
import App from './App'
import Home from './Pages/Home'
import Info from './Pages/Info'
import Classlist from './Pages/Classlist'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CookiesProvider>
    <Router basename='/'>
      <Routes>
        <Route exact={true} path='/' element={<App />} />
          <Route exact={true} path={localStorage.getItem('user-info') ? '/home' : '/'} element={<Home />} />
        <Route exact={true} path={localStorage.getItem('user-info') ? '/info' : '/'} element={<Info />} />
        <Route exact={true} path={localStorage.getItem('user-info') ? '/classlist' : '/'} element={<Classlist />} />
      </Routes>
    </Router>
  </CookiesProvider>
);
