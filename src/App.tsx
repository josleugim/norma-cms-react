import './App.css'
import 'bulma/css/bulma.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'

import Home from './components/Home'
import Login from './components/Auth/Login'
import Menu from './components/Menu'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, GuestRoute } from './components/Auth/ProtectedRoute'

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
