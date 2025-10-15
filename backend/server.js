// backend/server.js

const express = require('express');
const cors = require('cors'); // Middleware para evitar erros de comunicação com o frontend
const morgan = require('morgan'); // Middleware para logging detalhado (debug)

const app = express();
const PORT = 3000;

// Reverte para a importação simples (padrão Node.js).
// Isso pressupõe que 'api' está no mesmo nível de 'server.js' dentro da pasta 'backend'.
const produtoRoutes = require('./api/produto-routes');

// Configuração dos Middlewares
app.use(morgan('dev')); // Logging (Debug)
app.use(cors()); // CORS (Segurança/Comunicação)
app.use(express.json());

// Rota principal (apenas para teste)
app.get('/', (req, res) => {
  res.send('API do Portal Ouro Branco está no ar!');
});

// Define as rotas de produtos
app.use('/api/produtos', produtoRoutes);


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});