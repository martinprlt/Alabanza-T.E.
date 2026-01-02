import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Songs from './pages/Songs';
import SongDetail from './pages/SongDetail';
//import Setlists from './pages/Setlists';
//import Rhythms from './pages/Rhythms';
//import Tones from './pages/Tones';
import RequestSong from './pages/RequestSong';
import TestParser from './components/TestParser'; // Temporal para pruebas
//import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/song/:id" element={<SongDetail />} />
        <Route path="/request" element={<RequestSong />} />
        <Route path="/test-parser" element={<TestParser />} />
      </Routes>
    </Router>
  );
}

export default App;