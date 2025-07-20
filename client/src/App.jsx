// archivo App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeInterface from './views/welcome.jsx';
import LoginInterface from './views/logging.jsx';
import MapInterface from './views/map.jsx';
import CrudInterface from './views/crud.jsx';
import ViewMoreInterface from './views/viewEstructura.jsx';
import ProtectedRoute from './views/protectedRoute.jsx';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomeInterface />} />
          <Route path="/login" element={<LoginInterface />} />
          <Route path="/map" element={<MapInterface />} />
          <Route path="/viewEstructura" element={<ViewMoreInterface />} />
          <Route path="/crud" element={
            <ProtectedRoute>
                <CrudInterface />
            </ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

