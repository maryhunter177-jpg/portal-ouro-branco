// frontend/src/pages/CatalogPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// URL base do seu backend
const API_BASE_URL = 'http://localhost:3000/api'; 

// --- Componente Auxiliar: ProductCard ---
// Exibe um único produto no catálogo
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Adiciona 1 unidade do produto ao carrinho
    addToCart(product, 1);
    alert(`${product.nome} adicionado ao carrinho!`);
  };

  return (
    <div style={cardStyles.container}>
      {/* Imagem do Produto (Placeholder) */}
      <div style={cardStyles.imagePlaceholder}>
        <span style={cardStyles.imageText}></span>
      </div>

      <div style={cardStyles.info}>
        <h3 style={cardStyles.title}>{product.nome}</h3>
        <p style={cardStyles.description}>{product.descricao || 'Produto de alta qualidade Ouro Branco.'}</p>
        
        <p style={cardStyles.price}>
          <span style={{color: '#000'}}>R$</span> 
          <span style={{color: '#FFD700', fontWeight: 'bold', marginLeft: '5px'}}>{(product.preco || 0).toFixed(2)}</span>
        </p>

        <div style={cardStyles.actions}>
          <Link 
            to={`/catalogo/${product.id}`} 
            style={cardStyles.detailButton}
          >
            Ver Detalhes
          </Link>
          <button 
            onClick={handleAddToCart} 
            style={cardStyles.cartButton}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal: CatalogPage ---
const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Chamada ao backend para buscar produtos (usa produto-index-controller.js)
        const response = await fetch(`${API_BASE_URL}/produto/index`); 
        
        if (!response.ok) {
          throw new Error('Falha ao carregar produtos do servidor.');
        }

        const data = await response.json();
        // Assume que 'data' é um array de produtos, ou que 'data.produtos' contém o array.
        setProducts(data.produtos || data); 
        
      } catch (err) {
        console.error('Erro ao buscar catálogo:', err);
        setError('Não foi possível carregar o catálogo. Verifique o backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div style={pageStyles.centerText}>Carregando Catálogo Ouro Branco...</div>;
  }

  if (error) {
    return <div style={{...pageStyles.centerText, color: 'red'}}>{error}</div>;
  }

  return (
    <div style={pageStyles.container}>
      <h2 style={pageStyles.title}>Catálogo de Produtos</h2>
      <p style={pageStyles.subtitle}>Sua parceira em materiais e equipamentos de alta qualidade.</p>
      
      {products.length === 0 ? (
        <div style={pageStyles.noProducts}>Nenhum produto encontrado.</div>
      ) : (
        <div style={pageStyles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Estilos da Página (Preto, Dourado e Branco) ---

const pageStyles = {
  container: {
    padding: '20px 40px',
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#000000',
    borderBottom: '3px solid #FFD700', // Sublinhado Dourado
    paddingBottom: '10px',
    marginBottom: '5px',
    fontSize: '32px',
  },
  subtitle: {
    color: '#333',
    marginBottom: '30px',
    fontSize: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  centerText: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '20px',
    color: '#000000',
  },
  noProducts: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
    border: '1px solid #000000',
    backgroundColor: '#F0F0F0',
  }
};

// --- Estilos do Card de Produto ---

const cardStyles = {
  container: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)',
    }
  },
  imagePlaceholder: {
    height: '200px',
    backgroundColor: '#F9F9F9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #E0E0E0',
  },
  imageText: {
    color: '#000000',
    fontSize: '14px',
  },
  info: {
    padding: '15px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '18px',
    color: '#000000',
    marginBottom: '5px',
  },
  description: {
    fontSize: '14px',
    color: '#666',
    flexGrow: 1,
    marginBottom: '10px',
  },
  price: {
    fontSize: '22px',
    marginBottom: '15px',
    borderTop: '1px dashed #EEE',
    paddingTop: '10px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  detailButton: {
    flex: 1,
    padding: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#FFFFFF', 
    color: '#000000', 
    border: '1px solid #000000',
    fontSize: '14px',
    cursor: 'pointer',
  },
  cartButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#000000', // Preto
    color: '#FFD700', // Dourado
    border: '1px solid #000000',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default CatalogPage;