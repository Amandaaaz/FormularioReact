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
  font-family: 'Arial', sans-serif;
`;

const Titulo = styled.h1`
  font-size: 2em;
  margin-bottom: 10px;
  text-align: center;
  color: ${props => (props.modoEscuro ? '#4682B4' : '#4682B4')};
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
        <Titulo modoEscuro={modoEscuro}>Formulário</Titulo>
        <Formulario
          perguntaAtual={perguntaAtual}
          avancarPergunta={avancarPergunta}
        />
      </header>
    </AppContainer>
  );
}

export default App;
