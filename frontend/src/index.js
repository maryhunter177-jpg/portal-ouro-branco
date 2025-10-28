// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação correta para React 18+
import App from './App.jsx'; // <<<--- ESTA LINHA DEVE ESTAR ATIVA!
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* <<<--- ESTE COMPONENTE DEVE ESTAR ATIVO! */}
  </React.StrictMode>,
);