// src/App.js
import React, { useState } from 'react';
import Formulario from './components/Formulario';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Titulo = styled.h1`
  font-family: 'Arial', sans-serif;
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
`;

function App() {
  const [perguntaAtual, setPerguntaAtual] = useState(1);

  const avancarPergunta = () => {
    setPerguntaAtual(perguntaAtual + 1);
  };

  return (
    <AppContainer>
      <header className="App-header">
        <Titulo>Formulário</Titulo>
        <Formulario
          perguntaAtual={perguntaAtual}
          avancarPergunta={avancarPergunta}
        />
      </header>
    </AppContainer>
  );
}

export default App;
