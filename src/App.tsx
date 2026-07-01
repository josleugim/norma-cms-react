import './App.css'
import 'bulma/css/bulma.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'

import Menu from './components/Menu'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './router'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Menu />
        <div className="container">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
