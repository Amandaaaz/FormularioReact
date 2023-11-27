// src/components/Formulario.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import '../index.css';

const FormContainer = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  perspective: 1000px;
`;

const PerguntaContainer = styled(animated.div)`
  background-color: #f9f9f9;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;
  backface-visibility: hidden;
  image-rendering: optimizeQuality;
  font-smooth: always;
  -webkit-font-smoothing: antialiased;
  &:hover {
    transform: scale(1.02) rotateY(1.5deg) rotateX(1.5deg);
  }
`;

const DarkModePerguntaContainer = styled(PerguntaContainer)`
  background-color: #333;
  color: #fff;
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
  margin-top: 35px;
  padding: 10px 16px;
  background-color: #4682B4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-family: Andale Mono, monospace;
`;

const MensagemFinal = styled(animated.div)`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  color: #4682B4;
`;

const Checkbox = styled.input`
  margin-top: 10px;
`;

const MensagemErro = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const perguntas = [
  {
    texto: 'Você deseja começar com CPF ou CNPJ?',
    tipo: 'opcoes',
    opcoes: ['CPF', 'CNPJ'],
  },
  {
    texto: 'Sua Empresa faz parte do Softex?',
    tipo: 'opcoes',
    opcoes: ['Sim', 'Não'],
  },
  {
    texto: 'Conhece o Match Day?',
    tipo: 'opcoes',
    opcoes: ['Sim', 'Não'],
  },
  {
    texto: 'Nome da Empresa:',
    tipo: 'texto',
  },
  {
    texto: 'Quantos Funcionários?',
    tipo: 'opcoes',
    opcoes: ['4 a 10', '11 a 30', '31 a 50', '50+', '100+'],
  },
  // Adicione mais perguntas conforme necessário
];

const Formulario = ({ perguntaAtual, avancarPergunta }) => {
  const [resposta, setResposta] = useState([]);
  const [concluido, setConcluido] = useState(false);
  const [mostrarErro, setMostrarErro] = useState(false);

  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
  const slide = useSpring({ marginLeft: '0%', from: { marginLeft: '-100%' } });

  
const toggleCheckbox = (opcao) => {
  let opcoesSelecionadas;

  if (perguntas[perguntaAtual - 1].tipo === 'opcoes') {
    // Para perguntas do tipo 'opcoes', permite apenas uma opção selecionada
    opcoesSelecionadas = [opcao];
  } else {
    // Para outros tipos de perguntas, mantém a lógica original
    opcoesSelecionadas = [...resposta];

    if (opcoesSelecionadas.includes(opcao)) {
      const index = opcoesSelecionadas.indexOf(opcao);
      opcoesSelecionadas.splice(index, 1);
    } else {
      opcoesSelecionadas.push(opcao);
    }
  }

  setResposta(opcoesSelecionadas);
  setMostrarErro(false);
};

  const renderPergunta = (pergunta) => {
    switch (pergunta.tipo) {
      case 'opcoes':
        return pergunta.texto === 'Você deseja começar com CPF ou CNPJ?' ? (
          <>
            {renderOpcoes(pergunta.opcoes)}
            {resposta.includes('CPF') || resposta.includes('CNPJ') ? (
              <React.Fragment>
                <Label>Número do {resposta.includes('CPF') ? 'CPF' : 'CNPJ'}:</Label>
                <Input
                  type="text"
                  value={resposta}
                  onChange={(e) => setResposta(e.target.value)}
                />
              </React.Fragment>
            ) : null}
          </>
        ) : (
          renderOpcoes(pergunta.opcoes)
        );
      case 'texto':
        return (
          <Input
            type="text"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
          />
        );
      // Adicione mais tipos conforme necessário
      default:
        return null;
    }
  };

  const renderOpcoes = (opcoes) => {
    return opcoes.map((opcao, index) => (
      <React.Fragment key={index}>
        <label>
          <Checkbox
            type="checkbox"
            name="opcao"
            value={opcao}
            checked={resposta.includes(opcao)}
            onChange={() => toggleCheckbox(opcao)}
          />
          {opcao}
        </label>
        <br />
      </React.Fragment>
    ));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (perguntaAtual <= perguntas.length) {
      if (perguntaAtual === 1 && resposta.length === 0) {
        setMostrarErro(true);
      } else {
        avancarPergunta();
        setMostrarErro(false);
      }
    } else {
      setConcluido(true);
    }

    setResposta([]);
  };

  return (
    <FormContainer style={fade}>
      <PerguntaContainer style={slide}>
        {concluido ? (
          <MensagemFinal>
            Obrigado pelo cadastro para uso da SoftexLabs! Retornaremos em breve.
          </MensagemFinal>
        ) : (
          <FormularioForm onSubmit={handleSubmit}>
            {perguntaAtual <= perguntas.length && (
              <React.Fragment>
                <Label>{perguntas[perguntaAtual - 1].texto}</Label>
                {renderPergunta(perguntas[perguntaAtual - 1])}
                {mostrarErro && <MensagemErro>Selecione uma opção</MensagemErro>}
              </React.Fragment>
            )}
            <Button
              type="submit"
              disabled={
                mostrarErro ||
                (perguntaAtual <= perguntas.length && resposta.length === 0)
              }
            >
              {perguntaAtual < perguntas.length + 1 ? 'Próxima Pergunta' : 'Concluir'}
            </Button>
          </FormularioForm>
        )}
      </PerguntaContainer>
    </FormContainer>
  );
};

export default Formulario;