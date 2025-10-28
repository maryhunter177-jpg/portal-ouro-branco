// backend/api/produto-routes.js

const express = require('express');
const router = express.Router();

// Importa os controllers
const produtoIndexController = require('../controllers/produto-index-controller');
const produtoController = require('../controllers/produto-controller');


router.get('/index', produtoIndexController.getProdutosIndex);


router.get('/:codigo', produtoController.getProdutoDetalhe); 

module.exports = router;