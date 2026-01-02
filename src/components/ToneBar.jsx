import React, { useState, useEffect } from 'react';
import '../assets/styles/ToneBar.css';

// ESCALA CROMÁTICA COMPLETA con sostenidos y bemoles
const ESCALA_CROMATICA = [
  { nombre: 'DO', index: 0 },
  { nombre: 'DO#', index: 1, alternativo: 'REb' },
  { nombre: 'RE', index: 2 },
  { nombre: 'RE#', index: 3, alternativo: 'MIb' },
  { nombre: 'MI', index: 4 },
  { nombre: 'FA', index: 5 },
  { nombre: 'FA#', index: 6, alternativo: 'SOLb' },
  { nombre: 'SOL', index: 7 },
  { nombre: 'SOL#', index: 8, alternativo: 'LAb' },
  { nombre: 'LA', index: 9 },
  { nombre: 'LA#', index: 10, alternativo: 'SIb' },
  { nombre: 'SI', index: 11 }
];

// Mapeo de acordes para búsqueda rápida
const MAPA_ACORDES = {
  // Mayores
  'DO': 0, 'DO#': 1, 'REB': 1, 'RE': 2, 'RE#': 3, 'MIB': 3, 'MI': 4, 'FA': 5,
  'FA#': 6, 'SOLB': 6, 'SOL': 7, 'SOL#': 8, 'LAB': 8, 'LA': 9, 'LA#': 10, 'SIB': 10, 'SI': 11,
  
  // Menores
  'DOM': 0, 'DO#M': 1, 'REBM': 1, 'REM': 2, 'RE#M': 3, 'MIBM': 3, 'MIM': 4, 'FAM': 5,
  'FA#M': 6, 'SOLBM': 6, 'SOLM': 7, 'SOL#M': 8, 'LABM': 8, 'LAM': 9, 'LA#M': 10, 'SIBM': 10, 'SIM': 11,
  
  // Séptimas
  'DO7': 0, 'DO#7': 1, 'REB7': 1, 'RE7': 2, 'RE#7': 3, 'MIB7': 3, 'MI7': 4, 'FA7': 5,
  'FA#7': 6, 'SOLB7': 6, 'SOL7': 7, 'SOL#7': 8, 'LAB7': 8, 'LA7': 9, 'LA#7': 10, 'SIB7': 10, 'SI7': 11,
  
  // Otros
  'DOSUS4': 0, 'RESUS4': 2, 'MISUS4': 4, 'FASUS4': 5, 'SOLSUS4': 7, 'LASUS4': 9, 'SISUS4': 11,
  'DOADD9': 0, 'READD9': 2, 'MIADD9': 4, 'FAADD9': 5, 'SOLADD9': 7, 'LAADD9': 9, 'SIADD9': 11,
};

// Encontrar índice de un tono en la escala
const encontrarIndiceTono = (tono) => {
  const tonoUpper = tono.toUpperCase();
  for (const nota of ESCALA_CROMATICA) {
    if (nota.nombre === tonoUpper || nota.alternativo === tonoUpper) {
      return nota.index;
    }
  }
  return 0; // Por defecto DO
};

// Extraer base del acorde
const extraerBaseAcorde = (acorde) => {
  const acordeUpper = acorde.toUpperCase();
  
  // Buscar la base más larga posible
  const bases = Object.keys(MAPA_ACORDES).sort((a, b) => b.length - a.length);
  
  for (const base of bases) {
    if (acordeUpper.startsWith(base)) {
      return {
        base,
        resto: acordeUpper.slice(base.length),
        indice: MAPA_ACORDES[base]
      };
    }
  }
  
  // Si no encuentra, intentar con primer carácter
  const primerChar = acordeUpper.charAt(0);
  if (['C', 'D', 'E', 'F', 'G', 'A', 'B'].includes(primerChar)) {
    const conversiones = {
      'C': 'DO', 'D': 'RE', 'E': 'MI', 'F': 'FA', 
      'G': 'SOL', 'A': 'LA', 'B': 'SI'
    };
    return {
      base: conversiones[primerChar] || 'DO',
      resto: acordeUpper.slice(1),
      indice: encontrarIndiceTono(conversiones[primerChar] || 'DO')
    };
  }
  
  return {
    base: 'DO',
    resto: acordeUpper,
    indice: 0
  };
};

// Transponer un acorde individual
const transponerAcorde = (acorde, semitonos, usarBemoles = false) => {
  if (!acorde || acorde.trim() === '') return acorde;
  
  const { base, resto, indice } = extraerBaseAcorde(acorde);
  
  // Calcular nuevo índice
  const nuevoIndice = (indice + semitonos + 12) % 12;
  
  // Encontrar nueva nota base
  const nuevaNota = ESCALA_CROMATICA.find(n => n.index === nuevoIndice);
  
  if (!nuevaNota) return acorde;
  
  // Elegir nombre (sostenido o bemol)
  let nuevaBase;
  if (usarBemoles && nuevaNota.alternativo) {
    nuevaBase = nuevaNota.alternativo;
  } else {
    nuevaBase = nuevaNota.nombre;
  }
  
  // Preservar características
  const esMenor = base.includes('M') || base.toLowerCase().includes('m');
  const esSeptima = base.includes('7');
  const esSus4 = base.includes('SUS4');
  const esAdd9 = base.includes('ADD9');
  
  let resultado = nuevaBase;
  
  if (esMenor && !resultado.includes('M')) {
    resultado += 'm';
  }
  if (esSeptima && !resultado.includes('7')) {
    resultado += '7';
  }
  if (esSus4 && !resultado.includes('SUS4')) {
    resultado += 'sus4';
  }
  if (esAdd9 && !resultado.includes('ADD9')) {
    resultado += 'add9';
  }
  
  return resultado + resto;
};

// Transponer texto completo con acordes
const transponerTexto = (texto, semitonos, usarBemoles = false) => {
  if (!texto || semitonos === 0) return texto;
  
  const regex = /(\[([^\]]+)\])/g;
  
  return texto.replace(regex, (match, completo, acorde) => {
    const acordeTranspuesto = transponerAcorde(acorde, semitonos, usarBemoles);
    return `[${acordeTranspuesto}]`;
  });
};

// Componente principal COMPACTO y CORREGIDO
const ToneBar = ({ 
  tonoBase = 'DO', 
  onTonoChange = () => {},
  letraOriginal = '',
  onLetraCambiada = () => {}
}) => {
  const [semitonos, setSemitonos] = useState(0);
  const [usarBemoles, setUsarBemoles] = useState(false);

  // Efecto para calcular y notificar el tono actual
  useEffect(() => {
    const indiceBase = encontrarIndiceTono(tonoBase);
    const nuevoIndice = (indiceBase + semitonos + 12) % 12;
    
    const nuevaNota = ESCALA_CROMATICA.find(n => n.index === nuevoIndice);
    if (nuevaNota) {
      const nuevoTono = usarBemoles && nuevaNota.alternativo 
        ? nuevaNota.alternativo 
        : nuevaNota.nombre;
      
      // Notificar el cambio sin usar setState interno
      onTonoChange(nuevoTono);
    }
  }, [semitonos, tonoBase, usarBemoles, onTonoChange]);

  // Efecto para transponer la letra
  useEffect(() => {
    if (letraOriginal) {
      const letraTranspuesta = transponerTexto(letraOriginal, semitonos, usarBemoles);
      onLetraCambiada(letraTranspuesta);
    }
  }, [semitonos, letraOriginal, usarBemoles, onLetraCambiada]);

  const manejarTransposicion = (delta) => {
    const nuevosSemitonos = (semitonos + delta + 12) % 12;
    setSemitonos(nuevosSemitonos);
  };

  const reiniciarTono = () => {
    setSemitonos(0);
  };

  const alternarBemolesSostenidos = () => {
    setUsarBemoles(!usarBemoles);
  };

  // Obtener nombre del tono actual
  const obtenerNombreTonoActual = () => {
    const indiceBase = encontrarIndiceTono(tonoBase);
    const nuevoIndice = (indiceBase + semitonos + 12) % 12;
    const nota = ESCALA_CROMATICA.find(n => n.index === nuevoIndice);
    
    if (!nota) return tonoBase;
    
    return usarBemoles && nota.alternativo ? nota.alternativo : nota.nombre;
  };

  const tonoActualNombre = obtenerNombreTonoActual();

  return (
    <div className="tone-bar-compact">
      <div className="tone-header">
        <h4>🎹 Transposición</h4>
        <div className="tone-display">
          <span className="tone-original">{tonoBase}</span>
          <span className="tone-arrow">→</span>
          <span className="tone-actual">{tonoActualNombre}</span>
          <span className="tone-diff">
            {semitonos > 0 ? '+' : ''}{semitonos}
          </span>
        </div>
      </div>

      <div className="tone-controls-compact">
        <button
          className="tone-btn tone-down"
          onClick={() => manejarTransposicion(-1)}
          title="Bajar 1 semitono"
        >
          ➖
        </button>

        <div className="tone-presets">
          <button
            className="preset-btn"
            onClick={() => setSemitonos(-2)}
            title="Bajar 1 tono"
          >
            -2
          </button>
          <button
            className="preset-btn"
            onClick={reiniciarTono}
            title="Tono original"
            disabled={semitonos === 0}
          >
            {tonoBase}
          </button>
          <button
            className="preset-btn"
            onClick={() => setSemitonos(2)}
            title="Subir 1 tono"
          >
            +2
          </button>
        </div>

        <button
          className="tone-btn tone-up"
          onClick={() => manejarTransposicion(1)}
          title="Subir 1 semitono"
        >
          ➕
        </button>
      </div>

      <div className="tone-options">
        <label className="option-label">
          <input
            type="checkbox"
            checked={usarBemoles}
            onChange={alternarBemolesSostenidos}
          />
          <span>Usar bemoles (b)</span>
        </label>

        <div className="scale-preview">
          {ESCALA_CROMATICA.slice(0, 7).map((nota, idx) => {
            const notaNombre = usarBemoles && nota.alternativo ? nota.alternativo : nota.nombre;
            const esActual = notaNombre === tonoActualNombre;
            
            return (
              <span
                key={idx}
                className={`scale-note ${esActual ? 'scale-active' : ''}`}
                title={nota.nombre}
              >
                {notaNombre.charAt(0)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToneBar;