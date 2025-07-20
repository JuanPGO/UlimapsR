// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Welcome from './pages/Welcome/Welcome.jsx';
import Login from './pages/Login/Login.jsx';
import Map from './pages/Map/Map.jsx';
import CRUD from './pages/CRUD/CRUD.jsx'; 
import StructureDetail from './pages/StructureDetail/StructureDetail.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/map" element={<Map />} />
            <Route path="/structure/:id" element={<StructureDetail />} />
            <Route path="/crud" element={
              <ProtectedRoute>
                <CRUD />
              </ProtectedRoute>
            } />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;