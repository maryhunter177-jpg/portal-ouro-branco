// backend/server.js

const express = require('express');
const app = express();
const cors = require('cors'); 

// REQUIRES DE ROTAS
const produtoRoutes = require('./api/produto-routes'); // AGORA CONTÉM INDEX E DETALHE
const pedidoVendaRoutes = require('./api/pedido-venda-routes');
const usuarioRoutes = require('./api/usuario-routes');
const grupoRoutes = require('./api/grupo-routes'); 
const prazoRoutes = require('./api/prazo-routes'); 
const formaPagamentoRoutes = require('./api/forma-pagamento-routes'); 

// Define a porta do servidor
const PORT = 3000;

// MIDDLEWARE CORS: Permite o frontend em 1001 acessar o backend em 3000
app.use(cors({
    origin: 'http://localhost:3001' 
}));

// Middlewares para JSON e URL-encoded
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// REGISTRO DE ROTAS DE PRODUTO: Utiliza o prefixo /api/produtos (PLURAL AGORA)
// Esta é a linha corrigida para o plural!
app.use('/api/produtos', produtoRoutes); 

// Registro de Outras Rotas (Prefixadas apenas com /api)
app.use('/api', pedidoVendaRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', grupoRoutes);
app.use('/api', prazoRoutes);
app.use('/api', formaPagamentoRoutes);


// INICIALIZAÇÃO
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});