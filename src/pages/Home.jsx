import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-icon">🎵</span>
            T.E. Worship
          </h1>
          <p className="hero-subtitle">
            WebApp Offline de Alabanza - Para músicos y adoradores
          </p>
          <p className="hero-description">
            La herramienta definitiva para centralizar canciones, repertorios y tonos
            del ministerio de alabanza.
          </p>
          
          <div className="hero-buttons">
            <Link to="/songs" className="btn btn-primary">
              🎶 Ver Canciones
            </Link>
            <Link to="/request" className="btn btn-secondary">
              📨 Pedir Canción
            </Link>
          </div>
        </div>
      </header>

      <main className="main-content">
        
        {/* Sección: ¿Qué es? */}
        <section className="section what-is">
          <h2>🎯 ¿Qué es T.E. Worship?</h2>
          <div className="cards">
            <div className="card">
              <div className="card-icon">📱</div>
              <h3>PWA Offline</h3>
              <p>
                Una <strong>Progressive Web App</strong> que funciona sin internet.
                Instálala en tu celular o tablet y accede a todo el repertorio.
              </p>
            </div>
            
            <div className="card">
              <div className="card-icon">🎵</div>
              <h3>Versiones T.E.</h3>
              <p>
                Canciones con <strong>arreglos propios</strong> del ministerio.
                Ritmos adaptados, tonos ajustados y estructura pensada para nuestro flow.
              </p>
            </div>
            
            <div className="card">
              <div className="card-icon">🚫</div>
              <h3>Sin Dependencias</h3>
              <p>
                <strong>No dependas del líder</strong> para tener las canciones.
                Cada músico tiene acceso completo durante la semana.
              </p>
            </div>
          </div>
        </section>

        {/* Sección: Problemas que resuelve */}
        <section className="section problems">
          <h2>🔧 ¿Qué problemas resuelve?</h2>
          <div className="problem-list">
            <div className="problem-item">
              <span className="problem-number">1</span>
              <div>
                <h4>Dependencia del líder</h4>
                <p>"¿Quién tiene la hoja de acordes?" → Ahora todos la tienen en su celular.</p>
              </div>
            </div>
            
            <div className="problem-item">
              <span className="problem-number">2</span>
              <div>
                <h4>Información dispersa</h4>
                <p>WhatsApp, Drive, hojas sueltas → Todo centralizado en una app.</p>
              </div>
            </div>
            
            <div className="problem-item">
              <span className="problem-number">3</span>
              <div>
                <h4>Sin acceso entre semana</h4>
                <p>¿Sin internet? → La app funciona offline. Estudio cuando quieras.</p>
              </div>
            </div>
            
            <div className="problem-item">
              <span className="problem-number">4</span>
              <div>
                <h4>Tonos inconsistentes</h4>
                <p>Cambia tonos al vuelo con un clic. De DO a RE sin perder tiempo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Características */}
        <section className="section features">
          <h2>✨ Características Principales</h2>
          <div className="feature-grid">
            <div className="feature">
              <h3>🎸 Modo Músico</h3>
              <p>Acordes arriba, letra abajo. Perfecto para ensayar.</p>
            </div>
            
            <div className="feature">
              <h3>📄 Modo Letra</h3>
              <p>Solo texto para proyectar en pantalla.</p>
            </div>
            
            <div className="feature">
              <h3>🎹 Transposición</h3>
              <p>Cambia tonos automáticamente: DO → RE → MI...</p>
            </div>
            
            <div className="feature">
              <h3>🥁 Ritmos T.E.</h3>
              <p>Nomenclatura propia: "Balada 4T", "Flow 6T", etc.</p>
            </div>
            
            <div className="feature">
              <h3>📋 Repertorios</h3>
              <p>Listas para domingos, especiales, eventos.</p>
            </div>
            
            <div className="feature">
              <h3>📨 Solicitudes</h3>
              <p>Pedí nuevas canciones. Offline-first, se envían después.</p>
            </div>
          </div>
        </section>

        {/* Sección: Cómo usar */}
        <section className="section how-to">
          <h2>🚀 ¿Cómo empezar?</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Instalá la app</h3>
                <p>Abrí en Chrome/Edge y toca "Agregar a pantalla de inicio".</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Explorá canciones</h3>
                <p>Navegá por el repertorio completo con letra y acordes.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Usá offline</h3>
                <p>Una vez cargada, funciona sin internet. ¡Estudiá donde sea!</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Participá</h3>
                <p>Pedí nuevas canciones o sugerí mejoras.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Aclaraciones importantes */}
        <section className="section clarifications">
          <div className="clarification-card">
            <h3>🎵 Identidad del ministerio</h3>
            <p>
              Esta app contiene <strong>versiones propias T.E.</strong> de las canciones.
              No son copias exactas, están adaptadas a nuestro estilo, ritmos y flow de adoración.
            </p>
          </div>
          
          <div className="clarification-card">
            <h3>🔒 Uso interno</h3>
            <p>
              Es una herramienta <strong>exclusiva para el equipo de alabanza</strong>.
              Los arreglos y adaptaciones son propiedad intelectual del ministerio.
            </p>
          </div>
          
          <div className="clarification-card">
            <h3>🔄 Actualizaciones</h3>
            <p>
              Las canciones se actualizan automáticamente cuando hay conexión.
              Si el líder agrega una canción, todos la ven al abrir la app.
            </p>
          </div>
        </section>

        {/* Llamado a la acción */}
        <section className="cta-section">
          <h2>¿Listo para empezar?</h2>
          <p>Accedé a todo el repertorio ahora mismo.</p>
          <div className="cta-buttons">
            <Link to="/songs" className="btn btn-large">
              🎵 Explorar Canciones
            </Link>
            <Link to="/request" className="btn btn-outline">
              📨 Solicitar Canción
            </Link>
          </div>
          
          <div className="quick-links">
            <Link to="/setlists">📋 Repertorios</Link>
            <Link to="/rhythms">🥁 Ritmos T.E.</Link>
            <Link to="/tones">🎹 Canciones por Tono</Link>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>
          <strong>T.E. Worship</strong> - WebApp Offline de Alabanza v1.0
        </p>
        <p className="footer-note">
          Desarrollado para el ministerio de alabanza • Offline-first • React + PWA
        </p>
      </footer>
    </div>
  );
};

export default Home;