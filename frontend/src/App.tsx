import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Events from './pages/Events'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/events" element={<Events/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
