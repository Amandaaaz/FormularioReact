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

const MensagemFinal = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;

const Formulario = ({ perguntaAtual, avancarPergunta }) => {
  const [resposta, setResposta] = useState('');
  const [concluido, setConcluido] = useState(false);

  const handleChange = (valor) => {
    setResposta(valor);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Resposta ${perguntaAtual}: ${resposta}`);
    
    if (perguntaAtual < 5) {
      avancarPergunta();
      setResposta('');
    } else {
      setConcluido(true);
    }
  };

  return (
    <>
      <PerguntaContainer visivel={perguntaAtual <= 5 && !concluido}>
        <form onSubmit={handleSubmit}>
          <Label>
            Pergunta {perguntaAtual}:
            <Input
              type="text"
              value={resposta}
              onChange={(e) => handleChange(e.target.value)}
              required
            />
          </Label>
          <Button type="submit">
            {perguntaAtual < 5 ? 'Próxima Pergunta' : 'Concluir'}
          </Button>
        </form>
      </PerguntaContainer>

      {concluido && (
        <MensagemFinal>
          Seu formulário foi concluído, obrigado!
        </MensagemFinal>
      )}
    </>
  );
};

export default Formulario;
