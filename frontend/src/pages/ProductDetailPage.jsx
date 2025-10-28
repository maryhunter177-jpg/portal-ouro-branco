// frontend/src/pages/ProductDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// URL base do seu backend
const API_BASE_URL = 'http://localhost:3000/api'; 

const ProductDetailPage = () => {
  // Captura o 'productId' da URL (definido em App.jsx: /catalogo/:productId)
  const { productId } = useParams(); 
  const { addToCart } = useCart();

  const [productData, setProductData] = useState(null);
  const [unidadeInfo, setUnidadeInfo] = useState(null);
  const [grupoInfo, setGrupoInfo] = useState(null);
  const [prazoInfo, setPrazoInfo] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Estado para a quantidade a adicionar

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // --- 1. Busca Detalhes do Produto Principal ---
        const productResponse = await fetch(`${API_BASE_URL}/produto/${productId}`);
        if (!productResponse.ok) {
          throw new Error('Produto não encontrado ou falha na API de Produto.');
        }
        const product = await productResponse.json();
        setProductData(product);

        // O seu backend deve retornar o ID de unidade, grupo e prazo no objeto 'product'.
        const unidadeId = product.unidade_id; 
        const grupoId = product.grupo_id;
        const prazoId = product.prazo_id;

        // --- 2. Busca Unidade (usa unidade-controller.js) ---
        if (unidadeId) {
            const unidadeResponse = await fetch(`${API_BASE_URL}/unidade/${unidadeId}`);
            if (unidadeResponse.ok) {
                setUnidadeInfo(await unidadeResponse.json());
            }
        }
        
        // --- 3. Busca Grupo (usa grupo-controller.js) ---
        if (grupoId) {
            const grupoResponse = await fetch(`${API_BASE_URL}/grupo/${grupoId}`);
            if (grupoResponse.ok) {
                setGrupoInfo(await grupoResponse.json());
            }
        }

        // --- 4. Busca Prazo (usa prazo-controller.js) ---
        if (prazoId) {
            const prazoResponse = await fetch(`${API_BASE_URL}/prazo/${prazoId}`);
            if (prazoResponse.ok) {
                setPrazoInfo(await prazoResponse.json());
            }
        }

      } catch (err) {
        console.error('Erro ao buscar detalhes do produto:', err);
        setError('Erro ao carregar os detalhes do produto e suas informações relacionadas.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]); // Refaz a busca se o ID do produto mudar

  const handleAddToCart = () => {
    if (productData && quantity > 0) {
      // O objeto do produto deve incluir as informações essenciais para o carrinho
      addToCart(
        { 
          ...productData, 
          // Adiciona info de unidade, grupo e prazo ao item do carrinho para referência
          unidade: unidadeInfo, 
          grupo: grupoInfo, 
          prazo: prazoInfo 
        }, 
        quantity
      );
      alert(`${quantity}x ${productData.nome} adicionado ao carrinho!`);
    }
  };
  
  // --- Renderização de Status ---
  if (loading) {
    return <div style={styles.centerText}>Carregando detalhes do produto...</div>;
  }
  if (error) {
    return <div style={{...styles.centerText, color: 'red'}}>{error}</div>;
  }
  if (!productData) {
    return <div style={styles.centerText}>Produto não encontrado.</div>;
  }
  
  // --- Renderização da Página ---
  const precoFormatted = (productData.preco || 0).toFixed(2);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{productData.nome}</h1>

      <div style={styles.contentGrid}>
        {/* Coluna 1: Imagem e Descrição */}
        <div style={styles.imageCol}>
          <div style={styles.imagePlaceholder}>
            
          </div>
          <p style={styles.description}>{productData.descricao || 'Descrição detalhada em breve.'}</p>
        </div>

        {/* Coluna 2: Informações Técnicas e Compra */}
        <div style={styles.infoCol}>
          
          <div style={styles.priceBox}>
            <span style={styles.priceLabel}>Preço Unitário:</span>
            <span style={styles.priceValue}>R$ {precoFormatted}</span>
          </div>

          <h3 style={styles.sectionTitle}>Especificações Técnicas</h3>
          
          {/* Informações dos Controllers (o que foi solicitado) */}
          <div style={styles.detailRow}>
            <strong>Unidade:</strong> 
            <span style={styles.detailValue}>
                {unidadeInfo ? unidadeInfo.nome || 'Não informado' : 'Carregando...'}
            </span>
          </div>
          <div style={styles.detailRow}>
            <strong>Grupo:</strong> 
            <span style={styles.detailValue}>
                {grupoInfo ? grupoInfo.nome || 'Não informado' : 'Carregando...'}
            </span>
          </div>
          <div style={styles.detailRow}>
            <strong>Prazo:</strong> 
            <span style={styles.detailValue}>
                {prazoInfo ? prazoInfo.descricao || 'Não informado' : 'Carregando...'}
            </span>
          </div>

          {/* Área de Compra */}
          <div style={styles.buyArea}>
            <label htmlFor="quantity" style={styles.quantityLabel}>Quantidade:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={styles.quantityInput}
            />
            
            <button 
              onClick={handleAddToCart} 
              style={styles.addButton}
              disabled={loading}
            >
              Adicionar ao Carrinho
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Estilos da Página (Preto, Dourado e Branco) ---

const styles = {
  container: {
    padding: '30px 60px',
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#000000',
    borderBottom: '3px solid #FFD700',
    paddingBottom: '10px',
    marginBottom: '20px',
    fontSize: '36px',
  },
  centerText: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '20px',
    color: '#000000',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr', // Coluna de imagem/descrição e coluna de info/compra
    gap: '50px',
  },
  imageCol: {
    // Estilos para a coluna da imagem/descrição
  },
  imagePlaceholder: {
    width: '100%',
    height: '400px',
    backgroundColor: '#F0F0F0',
    border: '1px solid #E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontSize: '18px',
    marginBottom: '20px',
  },
  description: {
    fontSize: '16px',
    color: '#333',
    lineHeight: 1.6,
  },
  infoCol: {
    // Estilos para a coluna de informações e compra
  },
  sectionTitle: {
    color: '#000000',
    fontSize: '22px',
    borderBottom: '1px solid #000000',
    paddingBottom: '5px',
    marginTop: '30px',
    marginBottom: '15px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px dashed #DDD',
    fontSize: '16px',
    color: '#000000',
  },
  detailValue: {
    color: '#333',
    fontWeight: 'normal',
  },
  // Preço
  priceBox: {
    backgroundColor: '#F5F5F5',
    padding: '15px',
    borderLeft: '5px solid #FFD700', // Destaque Dourado
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: '18px',
    color: '#000000',
  },
  priceValue: {
    fontSize: '36px',
    color: '#FFD700',
    fontWeight: 'bold',
  },
  // Área de Compra
  buyArea: {
    marginTop: '30px',
    borderTop: '2px solid #000000',
    paddingTop: '20px',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  quantityLabel: {
    color: '#000000',
    fontWeight: 'bold',
  },
  quantityInput: {
    width: '60px',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #000000',
    textAlign: 'center',
  },
  addButton: {
    flex: 1,
    padding: '12px 20px',
    backgroundColor: '#000000', // Preto
    color: '#FFD700', // Dourado
    border: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default ProductDetailPage;