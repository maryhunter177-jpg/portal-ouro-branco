// backend/api/grupo-routes.js

const express = require('express');
const router = express.Router();
// Caminho relativo para o NOVO controller de grupos
const grupoController = require('../controllers/grupo-controller'); 

// Rota: Listagem de Grupos (Categorias)
// URL final: /api/grupos
router.get('/grupos', grupoController.ListarGrupos);

module.exports = router;