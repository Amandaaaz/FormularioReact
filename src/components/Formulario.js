// src/components/Formulario.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import '../index.css';


const MensagemInicial = styled(animated.div)`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  color: #333;
`;

const BotaoComecar = styled.button`
  margin-top: 40px;
  margin-left: 320px;
  padding: 15px 20px;
  background-color: #4682B4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  font-family: Andale Mono, monospace;
`;

const FormContainer = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  perspective: 1000px;
`;

const PerguntaContainer = styled(animated.div)`
  background-color: #f9f9f9;
  padding: 70px;
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
  font-size: 17px;
`;

const Input = styled.input.attrs((props) => ({
  type: props.type || 'text',
  pattern: props.pattern || '[0-9]*',
  inputMode: props.inputMode || 'numeric',
}))`
  width: 100%;
  padding: 12px; /* Ajustado o padding */
  margin-top: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  margin-top: 30px; /* Ajustado o margin-top */
  padding: 10px 15px;
  background-color: #4682B4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  font-family: Andale Mono, monospace;
`;

const MensagemFinal = styled(animated.div)`
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  color: #4682B4;
`;

const Checkbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 2px solid #4682B4;
  border-radius: 4px;
  width: 18px;
  height: 18px;
  outline: none;
  margin-top: 15px;
  position: relative;
  cursor: pointer;
  vertical-align: baseline;

  &:checked {
    background-color: #4682B4;
    border-color: #4682B4;
  }

  &:checked::before {
    content: '✔';
    font-size: 14px;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MensagemErro = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
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
  {
    texto: 'Qual a Sua Função Na Empresa?*',
    tipo: 'opcoes',
    opcoes: ['CEO', 'SENIOR', 'FOUNDER', 'JR', 'VENDEDOR', 'REPRESENTANTE', 'OUTROS'],
  },
  {
    texto: 'Sua Empresa Pertence a qual iniciativa setorial?',
    tipo: 'texto',
  },
  {
    texto: 'Sua Empresa é um negócio de impacto?',
    tipo: 'texto',
  },
  {
    texto: 'Qual a finalidade do uso da sala ou do laboratório da softexlabs?',
    tipo: 'texto',
  },
  {
    texto: 'Você Busca criar uma patente na SoftexLabs?',
    tipo: 'opcoes',
    opcoes: ['Sim', 'Não'],
  },
  {
    texto: 'Quantas Pessoas utilizarão a sala (Máximo 8 pessoas):',
    tipo: 'texto',
  },
  {
    texto: 'Descreva dia e horário:',
    tipo: 'texto',
  },
];

const Formulario = ({ perguntaAtual, avancarPergunta }) => {
  const [resposta, setResposta] = useState([]);
  const [concluido, setConcluido] = useState(false);
  const [mostrarErro, setMostrarErro] = useState(false);
  const [tentativaCPF, setTentativaCPF] = useState(false);
  const [tentativaCNPJ, setTentativaCNPJ] = useState(false);
  const [mostrarMensagemInicial, setMostrarMensagemInicial] = useState(true);

  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
  const slide = useSpring({ marginLeft: '0%', from: { marginLeft: '-100%' } });

  const handleComecar = () => {
    setMostrarMensagemInicial(false);
  };

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
            {(resposta.includes('CPF') || resposta.includes('CNPJ')) && (
              <>
                {resposta.includes('CPF') && (
                  <>
                    <Label>Número do CPF:</Label>
                    <Input
                      type="text"
                      placeholder="Digite apenas números"
                      value={resposta[1] || ''}
                      onChange={(e) => {
                        const onlyNumbers = e.target.value.replace(/\D/g, '');
                        setResposta(['CPF', onlyNumbers]);
                      }}
                    />
                  </>
                )}
                {resposta.includes('CNPJ') && (
                  <>
                    <Label>Número do CNPJ:</Label>
                    <Input
                      type="text"
                      placeholder="Digite apenas números"
                      value={resposta[1] || ''}
                      onChange={(e) => {
                        const onlyNumbers = e.target.value.replace(/\D/g, '');
                        setResposta(['CNPJ', onlyNumbers]);
                      }}
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          renderOpcoes(pergunta.opcoes)
        );
      case 'texto':
        return (
          <Input
            type="text"
            placeholder="Digite sua resposta"
            value={resposta[0] || ''}
            onChange={(e) => setResposta([e.target.value])}
          />
        );
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

  const validarCPF = (cpf) => {
    // Remover caracteres não numéricos
    // cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verificar se todos os dígitos são iguais (caso contrário, CPF é inválido)
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    // Algoritmo de validação do CPF
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf[9])) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf[10])) {
      return false;
    }

    return true;
  };

  const validarCNPJ = (cnpj) => {
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');

    // Verificar se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
      return false;
    }

    // Verificar se todos os dígitos são iguais (caso contrário, CNPJ é inválido)
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    // Algoritmo de validação do CNPJ
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(0))) {
      return false;
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (result !== parseInt(digits.charAt(1))) {
      return false;
    }

    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (mostrarMensagemInicial) {
      setMostrarMensagemInicial(false);
      return;
    }

    if (perguntaAtual <= perguntas.length) {
      const perguntaAtualInfo = perguntas[perguntaAtual - 1];

      if (perguntaAtual === 1 && resposta.length === 0) {
        setMostrarErro('O campo está vazio');
        return;
      }

      if (perguntaAtual === 1 && (resposta.includes('CPF') || resposta.includes('CNPJ'))) {
        const campoTexto = resposta[1] || '';

        if (!campoTexto.trim()) {
          setMostrarErro('O campo está vazio');
          return;
        }

        if (resposta.includes('CPF')) {
          const cpfValido = validarCPF(campoTexto);
          if (!cpfValido) {
            setTentativaCPF(true);
            setMostrarErro('CPF inválido');
            return;
          }
        } else if (resposta.includes('CNPJ')) {
          const cnpjValido = validarCNPJ(campoTexto);
          if (!cnpjValido) {
            setTentativaCNPJ(true);
            setMostrarErro('CNPJ inválido');
            return;
          }
        }
      }

      avancarPergunta();
      setMostrarErro(false);
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
        ) : mostrarMensagemInicial ? (
          <>
            <MensagemInicial>
              Bem-vindo ao formulário SoftexLabs! Serão 12 perguntas, vamos lá?
            </MensagemInicial>
            <BotaoComecar onClick={handleComecar}>Começar</BotaoComecar>
          </>
        ) : (
          <FormularioForm onSubmit={handleSubmit}>
            {perguntaAtual <= perguntas.length && (
              <>
                <Label>{perguntas[perguntaAtual - 1].texto}</Label>
                {renderPergunta(perguntas[perguntaAtual - 1])}
                {mostrarErro && <MensagemErro>{mostrarErro}</MensagemErro>}
              </>
            )}
            <Button
              onClick={handleSubmit}
              type="submit"
              disabled={
                mostrarErro || (perguntaAtual <= perguntas.length && resposta.length === 0)
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