// backend/api/produto-routes.js

const express = require('express');
const router = express.Router();

// CORREÇÃO: Usa o caminho relativo correto para encontrar a pasta 'controllers' dentro de 'backend'
const produtoController = require('../controllers/produto-controller');

// Define a rota GET para a raiz ('/') que resulta em GET /api/produtos
router.get('/', produtoController.listarProdutos);

module.exports = router;