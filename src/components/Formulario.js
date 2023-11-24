// src/components/Formulario.js
import React, { useState } from 'react';
import styled from 'styled-components';

const PerguntaContainer = styled.div`
  display: ${(props) => (props.visivel ? 'block' : 'none')};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Formulario = ({ perguntaAtual, avancarPergunta }) => {
  const [resposta, setResposta] = useState('');

  const handleChange = (valor) => {
    setResposta(valor);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Resposta ${perguntaAtual}: ${resposta}`);
    avancarPergunta();
    setResposta('');
  };

  return (
    <>
      <PerguntaContainer visivel={perguntaAtual === 1}>
        <form onSubmit={handleSubmit}>
          <Label>
            Pergunta 1:
            <Input
              type="text"
              value={resposta}
              onChange={(e) => handleChange(e.target.value)}
              required
            />
          </Label>
          <Button type="submit">Próxima Pergunta</Button>
        </form>
      </PerguntaContainer>

      {perguntaAtual === 2 && (
        <PerguntaContainer visivel={perguntaAtual === 2}>
          <form onSubmit={handleSubmit}>
            <Label>
              Pergunta 2:
              <Input
                type="text"
                value={resposta}
                onChange={(e) => handleChange(e.target.value)}
                required
              />
            </Label>
            <Button type="submit">Próxima Pergunta</Button>
          </form>
        </PerguntaContainer>
      )}

      {perguntaAtual === 3 && (
        <PerguntaContainer visivel={perguntaAtual === 3}>
          <form onSubmit={handleSubmit}>
            <Label>
              Pergunta 3:
              <Input
                type="text"
                value={resposta}
                onChange={(e) => handleChange(e.target.value)}
                required
              />
            </Label>
            <Button type="submit">Próxima Pergunta</Button>
          </form>
        </PerguntaContainer>
      )}

      {perguntaAtual === 4 && (
        <PerguntaContainer visivel={perguntaAtual === 4}>
          <form onSubmit={handleSubmit}>
            <Label>
              Pergunta 4:
              <Input
                type="text"
                value={resposta}
                onChange={(e) => handleChange(e.target.value)}
                required
              />
            </Label>
            <Button type="submit">Próxima Pergunta</Button>
          </form>
        </PerguntaContainer>
      )}

      {perguntaAtual === 5 && (
        <PerguntaContainer visivel={perguntaAtual === 5}>
          <form onSubmit={handleSubmit}>
            <Label>
              Pergunta 5:
              <Input
                type="text"
                value={resposta}
                onChange={(e) => handleChange(e.target.value)}
                required
              />
            </Label>
            <Button type="submit">Concluir</Button>
          </form>
        </PerguntaContainer>
      )}
    </>
  );
};

export default Formulario;
