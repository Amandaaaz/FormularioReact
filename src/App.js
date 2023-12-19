// src/App.js
import React, { useState } from 'react';
import Formulario from './components/Formulario';
import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${props => (props.modoEscuro ? '#222' : '#fff')};
  color: ${props => (props.modoEscuro ? '#000' : '#000')};
  font-family:  Andale Mono, monospace;
`;

function App() {
  const [perguntaAtual, setPerguntaAtual] = useState(1);
  const [modoEscuro, setModoEscuro] = useState(false);

  const avancarPergunta = () => {
    setPerguntaAtual(perguntaAtual + 1);
  };

  const toggleModoEscuro = () => {
    setModoEscuro(!modoEscuro);
  };

  return (
    <AppContainer modoEscuro={modoEscuro}>
      <DarkModeToggle toggleModoEscuro={toggleModoEscuro} />
      <header className="App-header">
        <Formulario
          perguntaAtual={perguntaAtual}
          avancarPergunta={avancarPergunta}
        />
      </header>
    </AppContainer>
  );
}

export default App;
