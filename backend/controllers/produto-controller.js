// backend/controllers/produto-controller.js

// DADOS FALSOS (MOCK) - Usado para teste
const mockProdutos = [
  {
    id: 1,
    codigo: 'INT-CAM-1010',
    nome: 'Câmera Intelbras VHD 1010 G5',
    marca: 'Intelbras',
    preco_base: 150.00,
    estoque: 50
  },
  {
    id: 2,
    codigo: 'FRM-AMP-SLIM2000',
    nome: 'Amplificador Frahm Slim 2000',
    marca: 'Frahm',
    preco_base: 450.00,
    estoque: 25
  },
  {
    id: 3,
    codigo: 'AVT-SUP-TETO',
    nome: 'Suporte de Teto para Projetor Avatron',
    marca: 'Avatron',
    preco_base: 95.50,
    estoque: 120
  }
];


// Função que será chamada pela rota para listar os produtos
const listarProdutos = (req, res) => {
  try {
    // Retorna a lista de produtos falsos
    res.status(200).json(mockProdutos);
  } catch (error) {
    // A função de debug (morgan) registrará a requisição,
    // e este erro retornará o status 500 caso algo dê errado.
    res.status(500).json({ message: 'Erro interno ao buscar produtos.' });
  }
};

// Exporta a função
module.exports = {
  listarProdutos,
};
