// backend/controllers/usuario-controller.js

const axios = require('axios');
// Reutiliza a função de autenticação
const getBimerAuthToken = require('../utils/getBimerToken'); 

// --- VARIÁVEIS DE CONFIGURAÇÃO ---
const BIMER_API_URL = 'http://192.168.5.16:8085'; 
// Endpoint correto para a lista de usuários, conforme seu Postman
const USUARIO_ENDPOINT_LISTAGEM = '/api/usuarios'; 

// Nome da função mudou para refletir o recurso
exports.ListarUsuarios = async (req, res) => {
    
    try {
        // 1. CHAMA O TOKEN (lógica de renovação/reutilização)
        const authToken = await getBimerAuthToken(); 
        
        // 2. MONTAGEM DO CABEÇALHO
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

    
        const params = {
            homeLogin: 'mari.xavier'
        };
        
        // 4. FAZ A CHAMADA GET PROTEGIDA
        const response = await axios.get(
            `${BIMER_API_URL}${USUARIO_ENDPOINT_LISTAGEM}`, 
            { headers: headers, params: params } // Adiciona os parâmetros aqui
        );
        
        // 5. ENVIA A RESPOSTA (200 OK)
        return res.status(200).json(response.data);

    } catch (error) {
        // TRATAMENTO DE ERRO
        console.error("Erro ao obter lista de usuários:", error.message);
        
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({ 
            message: "Falha interna no servidor ao buscar usuários." 
        });
    }
};