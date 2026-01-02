// SongDetail.jsx - Versión mejorada
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ToneBar from '../components/ToneBar';
import LyricParser from '../components/LyricParser';
import songsData from '../data/songs.json';
import '../assets/styles/SongDetail.css';

const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [letraTranspuesta, setLetraTranspuesta] = useState('');
  const [tonoActual, setTonoActual] = useState('');
  const [loading, setLoading] = useState(true);

  // Función para formatear letra
  const formatearLetraParaParser = (texto) => {
    if (!texto) return '';
    
    return texto
      .replace(/(\[[^\]]+\])([^\[\n]+)/g, '$1$2\n')
      .replace(/\s*\/\/\/?\s*/g, '\n//\n')
      .replace(/(CORO|PRE-CORO|INTRO|VERSO|PUENTE|OUTRO|TAG|FINAL)(\(.*?\))?:/gi, '\n$1:\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundSong = Array.isArray(songsData) 
        ? songsData.find(s => s.id === id)
        : null;
      
      if (foundSong) {
        setSong(foundSong);
        const letraFormateada = formatearLetraParaParser(foundSong.letraAcordes);
        setLetraTranspuesta(letraFormateada);
        setTonoActual(foundSong.tonoBase);
      }
      setLoading(false);
    }, 10);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="song-detail">
        <Navbar />
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando canción...</p>
        </div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="song-detail">
        <Navbar />
        <div className="not-found">
          <h2>🎵 Canción no encontrada</h2>
          <p>La canción con ID "{id}" no existe en el repertorio.</p>
          <Link to="/songs" className="back-link">
            ← Volver a canciones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="song-detail">
      <Navbar />
      
      {/* Header con navegación */}
      <div className="song-navigation">
        <Link to="/songs" className="nav-link">
          ← Todas las canciones
        </Link>
        <div className="song-position">
          {/* Podrías agregar navegación anterior/siguiente aquí */}
        </div>
      </div>
      
      {/* Encabezado de la canción */}
      <div className="song-header">
        <div className="song-title-section">
          <h1>{song.titulo}</h1>
          <div className="song-subtitle">
            <span className="author">✍️ {song.autor}</span>
            <span className="divider">•</span>
            <span className="version">🎵 {song.version}</span>
          </div>
        </div>
        
        <div className="song-meta-grid">
          <div className="meta-item">
            <span className="meta-label">🎹 Tono:</span>
            <span className="meta-value">{song.tonoBase}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">🥁 Ritmo:</span>
            <span className="meta-value">{song.ritmo}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">🎤 Para:</span>
            <span className="meta-value">{song.paraQuien}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">📊 Estado:</span>
            <span className={`meta-value status ${song.activo ? 'active' : 'inactive'}`}>
              {song.activo ? '✅ Activa' : '⏸️ Inactiva'}
            </span>
          </div>
        </div>
      </div>

      {/* ToneBar compacto */}
      <div className="tonebar-container">
        <ToneBar 
          tonoBase={song.tonoBase}
          onTonoChange={setTonoActual}
          letraOriginal={song.letraAcordes}
          onLetraCambiada={(transpuesta) => {
            const formateada = formatearLetraParaParser(transpuesta);
            setLetraTranspuesta(formateada);
          }}
        />
        
        <div className="current-tone-display">
          <span className="tone-label">Tono actual:</span>
          <span className="tone-value">{tonoActual || song.tonoBase}</span>
          {tonoActual !== song.tonoBase && (
            <span className="tone-change">
              ({song.tonoBase} → {tonoActual})
            </span>
          )}
        </div>
      </div>

      {/* Letra con acordes */}
      <div className="lyrics-container">
        <div className="lyrics-header">
          <h2>🎶 Letra y Acordes</h2>
          <div className="lyrics-actions">
            <button 
              className="action-btn print-btn"
              onClick={() => window.print()}
              title="Imprimir canción"
            >
              🖨️
            </button>
            <button 
              className="action-btn copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(song.letraAcordes);
                alert('Letra copiada al portapapeles');
              }}
              title="Copiar letra"
            >
              📋
            </button>
          </div>
        </div>
        
        <div className="lyrics-content">
          <LyricParser 
            lyricString={letraTranspuesta || formatearLetraParaParser(song.letraAcordes)}
            defaultMode="musician"
          />
        </div>
      </div>

      {/* Enganchables */}
      {song.enganchables && song.enganchables.length > 0 && (
        <div className="hooks-container">
          <h3>🎯 Enganchables destacados</h3>
          <div className="hooks-list">
            {song.enganchables.map((hook, index) => (
              <div key={index} className="hook-item">
                <span className="hook-quote">"</span>
                <span className="hook-text">{hook}</span>
                <span className="hook-quote">"</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer con info */}
      <div className="song-footer">
        <div className="footer-info">
          <div className="song-id">
            <span className="info-label">ID:</span>
            <span className="info-value">{song.id}</span>
          </div>
          <div className="song-tools">
            <Link to="/request" className="tool-link">
              📨 Pedir cambios
            </Link>
            <button 
              className="tool-link"
              onClick={() => {
                // Futura función para reportar error
                alert('Función de reporte en desarrollo');
              }}
            >
              🐛 Reportar error
            </button>
          </div>
        </div>
        
        <div className="footer-note">
          <small>
            💡 Usá los botones arriba para cambiar entre modo músico y letra.
            La transposición funciona en tiempo real.
          </small>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;