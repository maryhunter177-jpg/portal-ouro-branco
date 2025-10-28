// backend/api/unidade-routes.js

const express = require('express');
const router = express.Router();
// Caminho relativo para o novo controller
const unidadeController = require('../controllers/unidade-controller'); 

// Rota: Listagem de Unidades
// URL final: /api/unidades
router.get('/unidades', unidadeController.ListarUnidades);

module.exports = router;