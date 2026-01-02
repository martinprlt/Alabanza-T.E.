// src/pages/Songs.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/Songs.css';

// Importar datos - verifica que la ruta sea correcta
import songsData from '../data/songs.json';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Verificar que songsData sea un array
      if (Array.isArray(songsData)) {
        setSongs(songsData);
      } else if (songsData && typeof songsData === 'object') {
        // Si es un objeto individual, convertirlo a array
        setSongs([songsData]);
      } else {
        setError('Formato de datos incorrecto');
      }
      setLoading(false);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error al cargar las canciones');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="songs-container">
        <Navbar />
        <div className="loading">Cargando canciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="songs-container">
        <Navbar />
        <div className="error-message">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <p>Verifica que el archivo songs.json tenga el formato correcto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="songs-container">
      <Navbar />
      
      <div className="songs-header">
        <h1>🎵 Todas las Canciones</h1>
        <p className="songs-count">
          {songs.length} canción{songs.length !== 1 ? 'es' : ''} en el repertorio
        </p>
      </div>
      
      <div className="songs-grid">
        {songs.length > 0 ? (
          songs.map(song => (
            <Link 
              key={song.id}
              to={`/song/${song.id}`}
              className="song-card"
            >
              <div className="song-card-header">
                <h3 className="song-title">{song.titulo}</h3>
                <span className={`song-status ${song.activo ? 'active' : 'inactive'}`}>
                  {song.activo ? '✅' : '⏸️'}
                </span>
              </div>
              
              <div className="song-card-body">
                <p className="song-author">✍️ {song.autor}</p>
                <p className="song-version">🎵 {song.version}</p>
                
                <div className="song-details">
                  <span className="song-detail">
                    🎹 {song.tonoBase || 'Sin tono'}
                  </span>
                  <span className="song-detail">
                    🥁 {song.ritmo || 'Sin ritmo'}
                  </span>
                  <span className="song-detail">
                    🎤 {song.paraQuien || 'Todos'}
                  </span>
                </div>
                
                {song.enganchables && song.enganchables.length > 0 && (
                  <div className="song-hooks">
                    <small>🎯 Enganchable: "{song.enganchables[0]}"</small>
                  </div>
                )}
              </div>
              
              <div className="song-card-footer">
                <span className="view-song">Ver canción →</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-songs">
            <h3>📭 No hay canciones</h3>
            <p>Agrega canciones al archivo songs.json</p>
            <Link to="/request" className="btn-request">
              📨 Solicitar una canción
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Songs;