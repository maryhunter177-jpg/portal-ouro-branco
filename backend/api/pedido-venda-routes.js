// backend/api/pedido-venda-routes.js 

const express = require('express');
const router = express.Router();

// Caminho para o controller de Pedido de Venda
const pedidoVendaController = require('../controllers/pedido-venda-controller'); 

// Rota POST: Cria um novo Pedido de Venda
// URL final: /api/venda/pedidos
router.post('/pedidos', pedidoVendaController.RegistrarPedidoVenda); 

module.exports = router;