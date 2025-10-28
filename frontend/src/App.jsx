// backend/controllers/produto-index-controller.js

const fs = require('fs');
const path = require('path');

// Garante que o Node consiga encontrar o arquivo
exports.getProdutosIndex = (req, res) => {
    try {
        const produtosPath = path.join(process.cwd(), 'data', 'produtos-index.json');
        
        const data = fs.readFileSync(produtosPath, 'utf8');
        const produtos = JSON.parse(data); // AGORA ISSO FUNCIONARÁ
        
        return res.json({ produtos: produtos.produtos }); // RETORNA O ARRAY DENTRO DA CHAVE "PRODUTOS"
        
    } catch (error) {
        console.error('ERRO INTERNO NA LEITURA DO JSON:', error.message);
        return res.status(500).json({ 
            message: 'Erro interno do servidor ao carregar o índice de produtos.', 
            detailedError: error.message
        });
    }
};