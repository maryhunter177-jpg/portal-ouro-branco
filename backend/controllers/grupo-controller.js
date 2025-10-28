// backend/controllers/grupo-controller.js

const axios = require('axios');
// Reutiliza a função de autenticação
const getBimerAuthToken = require('../utils/getBimerToken'); 

// --- VARIÁVEIS DE CONFIGURAÇÃO ---
const BIMER_API_URL = 'http://192.168.5.16:8085'; 
// Endpoint correto para GRUPOS (Categorias)
const GRUPO_ENDPOINT_LISTAGEM = '/api/grupos'; 

// Nome da função mudou para refletir o recurso (Grupos)
exports.ListarGrupos = async (req, res) => {
    
    // O 'try...catch' garante que erros de token (ou rede) sejam tratados.
    try {
        // 1. CHAMA O TOKEN (lógica de renovação/reutilização)
        const authToken = await getBimerAuthToken(); 
        
        // 2. MONTAGEM DO CABEÇALHO COM O TOKEN
        const headers = {
            'Authorization': `Bearer ${authToken}`, // O token Bearer
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };

        // 3. FAZ A CHAMADA GET PROTEGIDA
        const response = await axios.get(
            `${BIMER_API_URL}${GRUPO_ENDPOINT_LISTAGEM}`, 
            { headers: headers }
        );
        
        // 4. ENVIA A RESPOSTA (200 OK)
        return res.status(200).json(response.data);

    } catch (error) {
        // 5. TRATAMENTO DE ERRO
        console.error("Erro ao obter lista de grupos:", error.message);
        
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        
        return res.status(500).json({ 
            message: "Falha interna no servidor ao comunicar com a API Bimer para grupos." 
        });
    }
};