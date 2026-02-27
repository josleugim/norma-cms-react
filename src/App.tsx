import './App.css'
import Banner from './components/Banner'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './components/Home'
import Login from './components/Auth/Login'
import Menu from './components/Menu'

function App() {
  return (
    <BrowserRouter>
    <Menu />
      <>
        <Banner />
      </>  
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
