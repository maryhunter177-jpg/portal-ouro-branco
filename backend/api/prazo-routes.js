// backend/api/prazo-routes.js

const express = require('express');
const router = express.Router();
// Caminho relativo para o novo controller
const prazoController = require('../controllers/prazo-controller'); 

// Rota: Listagem de Prazos
// URL final: /api/prazos
router.get('/prazos', prazoController.ListarPrazos);

module.exports = router;