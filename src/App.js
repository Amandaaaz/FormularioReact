// src/App.js
import React, { useState } from 'react';
import Formulario from './components/Formulario';

function App() {
  const [perguntaAtual, setPerguntaAtual] = useState(1);

  const avancarPergunta = () => {
    setPerguntaAtual(perguntaAtual + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meu Formulário React</h1>
        <Formulario
          perguntaAtual={perguntaAtual}
          avancarPergunta={avancarPergunta}
        />
      </header>
    </div>
  );
}

export default App;
