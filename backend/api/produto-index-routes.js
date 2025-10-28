// backend/api/produto-index-routes.js

const express = require('express');
const router = express.Router();

// O caminho está correto para sair de /api e entrar em /controllers
const indexController = require('../controllers/produto-index-controller'); 

// Rota final: /api/produtos/index
router.get('/produtos/index', indexController.ListarIndexProdutos);

module.exports = router;