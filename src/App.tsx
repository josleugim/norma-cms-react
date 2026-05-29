import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import Home from './components/Home'
import Login from './components/Auth/Login'
import Menu from './components/Menu'
import 'bulma/css/bulma.css'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Menu />
      <div className="container">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
