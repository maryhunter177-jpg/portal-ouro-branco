// backend/controllers/produto-index-controller.js

const path = require('path');
const fs = require('fs');

// Garante que o caminho seja C:\...\ourobranco-site\backend\data\produtos-index.json
const produtosIndexPath = path.join(__dirname, '..', 'data', 'produtos-index.json');

/**
 * Função para retornar todos os produtos do arquivo JSON de índice.
 * Rota esperada: GET /api/produtos/index
 */
exports.getProdutosIndex = (req, res) => {
    try {
        
        // Testa se o arquivo JSON existe e está no lugar certo
        if (!fs.existsSync(produtosIndexPath)) {
            console.error(`ERRO: Arquivo não encontrado: ${produtosIndexPath}`);
            return res.status(500).json({ 
                success: false, 
                message: `Arquivo de dados não encontrado. Caminho: ${produtosIndexPath}`
            });
        }
        
        // Lê o conteúdo do arquivo
        const data = fs.readFileSync(produtosIndexPath, 'utf8');
        
        // Se o arquivo estiver vazio, o JSON.parse pode falhar. 
        // Se a resposta for JSON vazio (como você viu), o problema é aqui.
        if (data.trim() === '') {
             return res.status(500).json({ 
                success: false, 
                message: 'O arquivo produtos-index.json está vazio.'
            });
        }

        // Converte o JSON para um objeto JavaScript
        const produtos = JSON.parse(data);
        
        // Retorna a lista de produtos
        return res.status(200).json({ 
            success: true, 
            total: Array.isArray(produtos) ? produtos.length : 0, 
            data: produtos 
        });

    } catch (error) {
        console.error('Erro ao processar getProdutosIndex (JSON.parse ou Leitura):', error.message);
        // Retorna um erro interno do servidor
        return res.status(500).json({ 
            success: false, 
            message: 'Erro interno: Falha ao ler ou analisar o JSON de produtos.',
            error: error.message
        });
    }
};