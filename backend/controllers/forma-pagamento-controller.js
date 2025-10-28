// backend/controllers/forma-pagamento-controller.js

const axios = require('axios');
const getBimerAuthToken = require('../utils/getBimerToken'); 

// --- VARIÁVEIS DE CONFIGURAÇÃO ---
const BIMER_API_URL = 'http://192.168.5.16:8085'; 
const ENDPOINT_LISTAGEM = '/api/formasdepagamento'; 

exports.ListarFormasPagamento = async (req, res) => {
    
    try {
        const authToken = await getBimerAuthToken(); 
        
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        
        const response = await axios.get(
            `${BIMER_API_URL}${ENDPOINT_LISTAGEM}`, 
            { headers: headers }
        );
        
        return res.status(200).json(response.data);

    } catch (error) {
        console.error("Erro ao obter lista de formas de pagamento:", error.message);
        
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({ 
            message: "Falha interna no servidor ao buscar formas de pagamento." 
        });
    }
};