// backend/api/usuario-routes.js

const express = require('express');
const router = express.Router();
// Caminho relativo para o novo controller
const usuarioController = require('../controllers/usuario-controller'); 

// Rota: Listagem de Usuários
// URL final: /api/usuarios
router.get('/usuarios', usuarioController.ListarUsuarios);

module.exports = router;