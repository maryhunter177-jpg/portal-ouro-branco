// backend/controllers/prazo-controller.js

const axios = require('axios');
// Reutiliza a função de autenticação
const getBimerAuthToken = require('../utils/getBimerToken'); 

// --- VARIÁVEIS DE CONFIGURAÇÃO ---
const BIMER_API_URL = 'http://192.168.5.16:8085'; 
// Endpoint conforme o Postman
const PRAZO_ENDPOINT_LISTAGEM = '/api/prazos'; 

// Nome da função para Prazos
exports.ListarPrazos = async (req, res) => {
    
    try {
        // 1. CHAMA O TOKEN (lógica de renovação/reutilização)
        const authToken = await getBimerAuthToken(); 
        
        // 2. MONTAGEM DO CABEÇALHO
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        
        // 3. FAZ A CHAMADA GET PROTEGIDA
        const response = await axios.get(
            `${BIMER_API_URL}${PRAZO_ENDPOINT_LISTAGEM}`, 
            { headers: headers }
        );
        
        // 4. ENVIA A RESPOSTA (200 OK)
        return res.status(200).json(response.data);

    } catch (error) {
        // TRATAMENTO DE ERRO
        console.error("Erro ao obter lista de prazos:", error.message);
        
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({ 
            message: "Falha interna no servidor ao buscar prazos." 
        });
    }
};