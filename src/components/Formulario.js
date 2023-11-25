// src/components/Formulario.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const FormContainer = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PerguntaContainer = styled(animated.div)`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormularioForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const MensagemFinal = styled(animated.div)`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;

const Formulario = ({ perguntaAtual, avancarPergunta }) => {
  const [resposta, setResposta] = useState('');
  const [concluido, setConcluido] = useState(false);

  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
  const slide = useSpring({ marginLeft: '0%', from: { marginLeft: '-100%' } });

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
    <FormContainer style={fade}>
      <PerguntaContainer style={slide}>
        {concluido ? (
          <MensagemFinal>
            Seu formulário foi concluído, obrigado!
          </MensagemFinal>
        ) : (
          <FormularioForm onSubmit={handleSubmit}>
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
          </FormularioForm>
        )}
      </PerguntaContainer>
    </FormContainer>
  );
};

export default Formulario;
