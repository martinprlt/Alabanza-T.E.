import React, { useState, useMemo } from 'react';
import '../assets/styles/LyricParser.css';

const LyricParser = ({ lyricString = '', defaultMode = 'musician' }) => {
  const [mode, setMode] = useState(defaultMode);

  // Parsear la letra y acordes para alineación correcta
  const parsedLines = useMemo(() => {
    if (!lyricString) return [];
    
    const lines = lyricString.split('\n');
    const result = [];
    
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        result.push({ type: 'empty' });
        return;
      }
      
      // Detectar secciones (PRE-CORO, CORO, etc.)
      const sectionMatch = trimmedLine.match(/^(CORO|PRE-CORO|INTRO|VERSO|PUENTE|OUTRO|TAG|FINAL|INTERLUDIO)(\(.*?\))?:/i);
      if (sectionMatch) {
        const sectionName = trimmedLine.replace(':', '').trim();
        result.push({
          type: 'section',
          content: sectionName.toUpperCase(),
          originalLine: trimmedLine
        });
        return;
      }
      
      // Para líneas con texto y acordes
      const chordsInLine = [];
      const textParts = [];
      
      // Buscar todos los acordes entre corchetes
      const chordRegex = /\[([^\]]+)\]/g;
      let lastIndex = 0;
      let match;
      
      // Primero extraer acordes y sus posiciones
      while ((match = chordRegex.exec(trimmedLine)) !== null) {
        const chord = match[1];
        const position = match.index;
        
        chordsInLine.push({
          chord,
          position: position - (match[0].length - 1) // Ajustar por los corchetes
        });
        
        // Agregar texto entre acordes
        if (position > lastIndex) {
          textParts.push(trimmedLine.substring(lastIndex, position));
        }
        
        lastIndex = position + match[0].length;
      }
      
      // Agregar texto restante después del último acorde
      if (lastIndex < trimmedLine.length) {
        textParts.push(trimmedLine.substring(lastIndex));
      }
      
      // Si no había acordes, es solo texto
      if (chordsInLine.length === 0) {
        // Verificar si es un separador (// o ///)
        if (trimmedLine.includes('//')) {
          result.push({
            type: 'separator',
            content: trimmedLine,
            originalLine: trimmedLine
          });
        } else {
          result.push({
            type: 'text-only',
            content: trimmedLine,
            originalLine: trimmedLine
          });
        }
        return;
      }
      
      // Para línea con acordes
      result.push({
        type: 'chord-line',
        chords: chordsInLine,
        textParts: textParts.filter(t => t.trim() !== ''),
        fullText: trimmedLine.replace(chordRegex, '').trim(),
        originalLine: trimmedLine
      });
    });
    
    return result;
  }, [lyricString]);

  // Renderizar línea según tipo
  const renderLine = (line, index) => {
    if (line.type === 'section') {
      return (
        <div key={`section-${index}`} className="section-line">
          <div className="section-label">{line.content}</div>
        </div>
      );
    }
    
    if (line.type === 'separator') {
      return (
        <div key={`separator-${index}`} className="separator-line">
          <hr />
        </div>
      );
    }
    
    if (line.type === 'text-only') {
      return (
        <div key={`text-${index}`} className="text-only-line">
          {line.content}
        </div>
      );
    }
    
    if (line.type === 'empty') {
      return <div key={`empty-${index}`} className="empty-line"><br /></div>;
    }
    
    if (line.type === 'chord-line') {
      if (mode === 'musician') {
        // Modo músico: acordes arriba, texto abajo
        return (
          <div key={`chordline-${index}`} className="musician-line">
            {/* Línea de acordes - posicionados sobre el texto */}
            <div className="chord-line">
              {line.chords.map((chordInfo, chordIndex) => (
                <span
                  key={`chord-${index}-${chordIndex}`}
                  className="chord-tag"
                  style={{ 
                    marginLeft: chordIndex === 0 ? '0' : '0.5em'
                  }}
                >
                  {chordInfo.chord}
                </span>
              ))}
            </div>
            
            {/* Línea de texto */}
            <div className="text-line">
              {line.fullText || line.textParts.join(' ')}
            </div>
          </div>
        );
      } else {
        // Modo letra: solo texto (para proyectar)
        return (
          <div key={`chordline-${index}`} className="lyric-line">
            {line.fullText || line.originalLine.replace(/\[([^\]]+)\]/g, '')}
          </div>
        );
      }
    }
    
    return null;
  };

  return (
    <div className="lyric-parser-container">
      {/* Selector de modo */}
      <div className="mode-selector">
        <button 
          className={`mode-btn ${mode === 'musician' ? 'active' : ''}`}
          onClick={() => setMode('musician')}
          title="Ver acordes y letra"
        >
          🎸 Músico
        </button>
        <button 
          className={`mode-btn ${mode === 'lyric' ? 'active' : ''}`}
          onClick={() => setMode('lyric')}
          title="Solo letra (para proyectar)"
        >
          📄 Letra
        </button>
      </div>

      {/* Contenedor de letras */}
      <div className={`lyrics-content ${mode}`}>
        {parsedLines.map((line, index) => renderLine(line, index))}
      </div>
    </div>
  );
};

export default LyricParser;