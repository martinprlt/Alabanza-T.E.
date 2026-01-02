import React from 'react';
import LyricParser from './LyricParser';

const TestParser = () => {
  const testLyrics = `INTRO
[DO]//En mi angustia yo clamé a ti
[DO]No te veo pero te puedo sentir
[DO]Tú estás aquí
[DO]Te puedo sentir//

PRE-CORO:
[DO]//Y si Pablo y Silas te adoraron y las cadenas les fueron quitadas [MIm]
[RE]Así quiero adorarte //

CORO (primera vez solamente):
[DO]Tú amor rompe cadenas
[DO]No tiene fronteras [RE]
[MIm]Tú luz rompe condena
[MIm]No tiene barreras
[SOL] - [DO] - [MIm] - [RE]

CORO:
[DO]Tú amor rompe cadenas [SIm]
[DO]No tiene fronteras [RE]
[MIm]Tú luz rompe condena
[MIm]No tiene barreras
[DO]Dios, Dios, Dios

[DO]///El velo que impedía
[DO]Tu presencia en mi vida
[RE]Se rompió [MIm]
[SIm]Se rompió///

[DO]///Llegó Jesús el que pelea mis batallas
[DO]Llegó Jesús el que mueve las montañas [RE]
[MIm]Llegó mi amado llegó mi amado [MIm]
[SIm]Llegó mi amado/// amadoooooooo

TAG:
Puente chords`;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔍 Test del Parser</h1>
      <p>Probando el parseo de la canción "Pablo y Silas"</p>
      
      <div style={{ marginTop: '30px', border: '2px solid #ccc', padding: '20px', borderRadius: '10px' }}>
        <LyricParser lyricString={testLyrics} defaultMode="musician" />
      </div>
      
      <div style={{ marginTop: '40px', background: '#f0f9ff', padding: '20px', borderRadius: '10px' }}>
        <h3>Texto original para comparar:</h3>
        <pre style={{ 
          background: '#f8f8f8', 
          padding: '15px', 
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace'
        }}>
          {testLyrics}
        </pre>
      </div>
    </div>
  );
};

export default TestParser;