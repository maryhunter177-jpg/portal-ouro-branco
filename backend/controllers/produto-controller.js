// backend/controllers/produto-controller.js (Sem alterações, usa a função automatizada)

const axios = require('axios');
const getBimerAuthToken = require('../utils/getBimerToken'); 

const BIMER_API_BASE_URL = 'http://192.168.5.16:8085/api/produtosmaster'; 

exports.getProdutoDetalhe = async (req, res) => {
    const { codigo } = req.params; 

    try {
        // 1. OBTÉM OU GERA O TOKEN DE ACESSO AUTOMATICAMENTE
        const token = await getBimerAuthToken(); 

        // 2. FAZ A REQUISIÇÃO PARA A API BIMER
        const response = await axios.get(BIMER_API_BASE_URL, {
            params: { codigo: codigo },
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return res.status(200).json({ success: true, data: response.data });

    } catch (error) {
        // ... (Lógica de tratamento de erro para 400, 401, etc.)
        if (error.message.includes('Falha na autenticação com a API Bimer')) {
            return res.status(500).json({ 
                success: false, 
                message: 'Erro de autenticação com a API Bimer.',
                detail: 'O login está sendo rejeitado com Status 400. Requisito de Client ID ou Ambiente não atendido.'
            });
        }
        
        const detail = error.response?.status 
            ? `Status code ${error.response.status} (${error.response.statusText})` 
            : error.message;

        return res.status(500).json({ 
            success: false, 
            message: 'Erro ao conectar ou processar dados da API Bimer.',
            detail: detail
        });
    }
};