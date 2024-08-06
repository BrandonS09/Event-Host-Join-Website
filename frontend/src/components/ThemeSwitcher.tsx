import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

const Button = styled.button<{ theme: string }>`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#333' : '#fff')};
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  z-index: 1000; /* Ensure ThemeSwitcher is above other content */
  
  &:hover {
    background: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#555')};
  }

  svg {
    font-size: 24px;
  }
`;

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button theme={theme} onClick={toggleTheme}>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </Button>
  );
};

export default ThemeSwitcher;
