import React from 'react';
// CORREÇÃO ESSENCIAL: Voltando para a sintaxe de importação do React 17
import ReactDOM from 'react-dom'; 

// 1. Importa o arquivo principal de estilos (onde você importa o Tailwind)
import './index.css';

// 2. Importa o componente principal da aplicação
import App from './App';

// 3. Ponto de entrada da aplicação React usando a sintaxe LEGADA (React 17)
// O render() é chamado diretamente no elemento 'root'.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);