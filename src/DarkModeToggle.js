// src/DarkMode.Toggle.js
import React from 'react';
import styled from 'styled-components';

const DarkModeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-family:  Andale Mono, monospace;
`;

const DarkModeToggle = ({ toggleModoEscuro }) => {
  return (
    <DarkModeButton onClick={toggleModoEscuro}>
      Modo Escuro
    </DarkModeButton>
  );
};

export default DarkModeToggle;
