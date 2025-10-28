// backend/api/forma-pagamento-routes.js

const express = require('express');
const router = express.Router();
const formaPagamentoController = require('../controllers/forma-pagamento-controller'); 

// Rota: Listagem de Formas de Pagamento
// URL final: /api/formasdepagamento
router.get('/formasdepagamento', formaPagamentoController.ListarFormasPagamento);

module.exports = router;