import './App.css'
import 'bulma/css/bulma.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'

import Home from './pages/Home'
import Login from './pages/Login'
import Menu from './components/Menu'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, GuestRoute } from './components/Auth/ProtectedRoute'
import Resolution from './pages/Resolution'
import Paragraph from './pages/Paragraph'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Menu />
        <div className="container">
          <Routes>
            <Route
              index
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/resolutions" element={
              <ProtectedRoute>
                <Resolution />
              </ProtectedRoute>
            } />
            <Route path="/criteria" element={
              <ProtectedRoute>
                <Paragraph />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
