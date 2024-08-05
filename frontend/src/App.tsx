import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust path as needed
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Events from './pages/Events';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ marginTop: '4rem' }}> {/* Adjust margin to ensure content is below Navbar */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
