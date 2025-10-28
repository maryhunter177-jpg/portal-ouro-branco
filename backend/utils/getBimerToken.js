// backend/utils/getBimerToken.js

const axios = require('axios');
const querystring = require('querystring'); 
const { Buffer } = require('buffer'); 

// --- CONFIGURAÇÃO ---
const BIMER_API_URL = 'http://192.168.5.16:8085'; 
// CORRIGIDO PARA /auth/token, como no Postman
const TOKEN_ENDPOINT = '/auth/token'; 
const USERNAME = 'mari.xavier'; 
const PASSWORD = '123456';     

// Autenticação Basic Auth (necessário para APIs OAuth 2.0)
const AUTH_HEADER = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64'); 

// --- Variáveis de estado (Cache) ---
let currentToken = null;
let tokenExpiry = 0; 

async function getBimerAuthToken() {
    
    // Verifica o cache
    if (currentToken && Date.now() < tokenExpiry - 10000) {
        return currentToken;
    }

    console.log('[Token Bimer] Obtendo novo Token de Acesso Bimer...');

    const requestBody = querystring.stringify({
        grant_type: 'password',
        username: USERNAME,
        password: PASSWORD,
    });
    
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${AUTH_HEADER}`, 
        'Accept': 'application/json',
    };

    try {
        const response = await axios.post(
            `${BIMER_API_URL}${TOKEN_ENDPOINT}`,
            requestBody, 
            { headers: headers }
        );

        const data = response.data;
        currentToken = data.accessToken; 
        tokenExpiry = Date.now() + (data.expires_in * 1000); 
        
        return currentToken;

    } catch (error) {
        // Trata o erro 400
        if (error.response) {
            console.error('[Token Bimer] Falha de AUTENTICAÇÃO (Status:', error.response.status, ')');
            console.error('[Token Bimer] Mensagem da API:', error.response.data);
        }
        throw new Error('Falha na autenticação com a API Bimer.');
    }
}

module.exports = getBimerAuthToken;