// backend/controllers/pedido-venda-controller.js

const axios = require('axios');
const getBimerAuthToken = require('../utils/getBimerToken'); 

// --- VARIÁVEIS DE CONFIGURAÇÃO ---
const BIMER_API_URL = 'http://192.168.5.16:8085'; 
const PEDIDO_ENDPOINT = '/api/venda/pedidos'; 


// FUNÇÃO PRINCIPAL: REGISTRAR UM NOVO PEDIDO DE VENDA
// Recebe os dados do carrinho (JSON) no corpo da requisição (req.body)
exports.RegistrarPedidoVenda = async (req, res) => {
    // O corpo da requisição (req.body) deve conter o JSON do pedido no formato que a Bimer espera
    const dadosPedido = req.body; 

    // Validação básica para garantir que o corpo da requisição não está vazio
    if (!dadosPedido || Object.keys(dadosPedido).length === 0) {
        return res.status(400).json({ message: "Corpo da requisição vazio ou inválido. Dados do pedido são obrigatórios." });
    }

    try {
        const authToken = await getBimerAuthToken(); 
        
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json', // É crucial indicar que estamos enviando JSON
            'Accept': 'application/json',
        };

        const consultaUrl = `${BIMER_API_URL}${PEDIDO_ENDPOINT}`;
        
        console.log(`Enviando Pedido de Venda via POST para: ${consultaUrl}`); 
        
        // Faz a requisição POST. Envia dadosPedido no corpo.
        const response = await axios.post(consultaUrl, dadosPedido, { headers: headers });
        
        // A API Bimer deve retornar o pedido registrado, geralmente com um código/ID.
        return res.status(201).json(response.data); // Status 201 (Created) para sucesso na criação

    } catch (error) {
        console.error("Erro ao registrar Pedido de Venda:", error.message);
        
        if (error.response) {
            // Se houver um erro específico da API Bimer (ex: dados inválidos no pedido)
            return res.status(error.response.status).json(error.response.data);
        }
        
        return res.status(500).json({ 
            message: "Falha interna ao registrar o Pedido de Venda." 
        });
    }
};