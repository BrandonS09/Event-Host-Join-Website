import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust path as needed
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Events from './pages/Events';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login" />;
};

const RegisterAndLogout = () => {
  localStorage.clear();
  return <Register />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ marginTop: '4rem' }}> {/* Adjust margin to ensure content is below Navbar */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
