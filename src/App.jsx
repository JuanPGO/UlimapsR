import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* Temporal: solo Welcome por ahora */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;