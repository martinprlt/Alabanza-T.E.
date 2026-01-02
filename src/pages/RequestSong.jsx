// src/pages/RequestSong.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../assets/styles/RequestSong.css';

const RequestSong = () => {
  const [formData, setFormData] = useState({
    songName: '',
    artist: '',
    reason: '',
    urgency: 'normal', // baja, normal, alta
    contact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Guardar localmente (IndexedDB o localStorage)
    const requests = JSON.parse(localStorage.getItem('songRequests') || '[]');
    const newRequest = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    requests.push(newRequest);
    localStorage.setItem('songRequests', JSON.stringify(requests));
    
    // 2. Mostrar confirmación
    alert('✅ Solicitud guardada. Se enviará cuando haya conexión.');
    
    // 3. Limpiar formulario
    setFormData({
      songName: '',
      artist: '',
      reason: '',
      urgency: 'normal',
      contact: ''
    });
  };

  return (
    <div className="request-page">
      <Navbar />
      
      <div className="request-container">
        <h1>📨 Solicitar Nueva Canción</h1>
        <p className="subtitle">
          ¿Falta alguna canción en el repertorio? ¡Pedila aquí!<br />
          <small>La solicitud se guardará localmente y se enviará cuando haya internet.</small>
        </p>
        
        <form onSubmit={handleSubmit} className="request-form">
          <div className="form-group">
            <label>🎵 Nombre de la canción *</label>
            <input
              type="text"
              value={formData.songName}
              onChange={(e) => setFormData({...formData, songName: e.target.value})}
              placeholder="Ej: 'Tu amor rompe cadenas'"
              required
            />
          </div>
          
          <div className="form-group">
            <label>👤 Artista / Ministerio</label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) => setFormData({...formData, artist: e.target.value})}
              placeholder="Ej: 'Oasis Ministry'"
            />
          </div>
          
          <div className="form-group">
            <label>📝 ¿Por qué la querés agregar?</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Nos ayuda a entender el contexto..."
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>⚠️ Urgencia</label>
              <select 
                value={formData.urgency}
                onChange={(e) => setFormData({...formData, urgency: e.target.value})}
              >
                <option value="low">Baja (para algún día)</option>
                <option value="normal">Normal (próximos domingos)</option>
                <option value="high">Alta (necesaria para este domingo)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>📧 Contacto (opcional)</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                placeholder="Tu nombre o email"
              />
            </div>
          </div>
          
          <button type="submit" className="submit-btn">
            📨 Enviar Solicitud
          </button>
          
          <p className="form-note">
            <small>
              * La canción será revisada por el equipo de alabanza.<br />
              Si es aprobada, se agregará con versión T.E. y ritmo adaptado.
            </small>
          </p>
        </form>
        
        <div className="offline-info">
          <h3>📱 Modo Offline</h3>
          <p>Las solicitudes se guardan en tu dispositivo y se sincronizan automáticamente cuando vuelve la conexión.</p>
          
          <div className="stats">
            <div className="stat">
              <strong>📊 Pendientes:</strong> 
              <span id="pending-count">0</span>
            </div>
            <div className="stat">
              <strong>🔄 Última sincronización:</strong>
              <span id="last-sync">Nunca</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSong;