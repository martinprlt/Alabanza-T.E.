// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-icon">🎵</span>
        <h1>T.E. Worship</h1>
      </div>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">🏠 Inicio</Link>
        <Link to="/songs" className="nav-link">🎶 Canciones</Link>
        <Link to="/setlists" className="nav-link">📋 Repertorios</Link>
        <Link to="/rhythms" className="nav-link">🥁 Ritmos</Link>
        <Link to="/tones" className="nav-link">🎹 Tonos</Link>
        <Link to="/request" className="nav-link">📨 Pedir Canción</Link>
        <button className="nav-sync-btn" title="Sincronizar datos">
          🔄
        </button>
      </div>
    </nav>
  );
};

export default Navbar;