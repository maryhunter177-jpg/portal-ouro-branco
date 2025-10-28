// frontend/src/components/CartMenu.jsx

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Componente que representa o menu lateral do carrinho
const CartMenu = () => {
  const { cartItems, totalAmount, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  // No seu projeto final, 'isVisible' seria gerenciado via estado global ou prop
  // Aqui, vamos apenas simular para mostrar o estilo e a lógica interna.
  const [isVisible, setIsVisible] = useState(true); 

  const handleCheckout = () => {
    // Esconde o menu e navega para a página de finalização
    setIsVisible(false);
    navigate('/finalizar-compra');
  };

  if (!isVisible) {
    return null; // Não renderiza se não estiver visível
  }

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h3 style={styles.title}>🛒 Seu Carrinho</h3>
        <button 
          onClick={() => setIsVisible(false)} // Simula o fechamento
          style={styles.closeButton}
        >
          X
        </button>
      </div>

      {/* Lista de Itens */}
      <div style={styles.itemsList}>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Seu carrinho está vazio.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} style={styles.item}>
              <div style={styles.itemDetails}>
                <span style={styles.itemName}>{item.nome}</span>
                <span style={styles.itemQuantity}>({item.quantity} un.)</span>
              </div>
              <span style={styles.itemPrice}>
                R$ {(item.preco * item.quantity).toFixed(2)}
              </span>
              <button 
                onClick={() => removeFromCart(item.id)} 
                style={styles.removeButton}
                title="Remover item"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Resumo e Botões de Ação */}
      {cartItems.length > 0 && (
        <div style={styles.footer}>
          <div style={styles.totalRow}>
            <span>TOTAL:</span>
            <span style={styles.totalAmount}>R$ {totalAmount.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleCheckout} 
            style={styles.checkoutButton}
            title="Ir para a página de Pagamento e Entrega"
          >
            Finalizar Compra
          </button>
          
          <button 
            onClick={clearCart} 
            style={styles.clearButton}
          >
            Limpar Carrinho
          </button>
        </div>
      )}
    </div>
  );
};

// --- Estilos para o Menu Lateral (Preto, Dourado e Branco) ---

const styles = {
  // Sidebar (Menu Lateral)
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '350px', 
    height: '100%',
    backgroundColor: '#FFFFFF', // Fundo Branco
    boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateX(0)', // Se fosse dinâmico, seria 'translateX(100%)' quando invisível
  },
  // Cabeçalho do Menu
  header: {
    padding: '20px',
    borderBottom: '2px solid #000000', // Separador Preto
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000', // Fundo Preto para o Cabeçalho
    color: '#FFD700', // Dourado
  },
  title: {
    margin: 0,
    fontSize: '20px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#FFD700', // Dourado
    fontSize: '20px',
    cursor: 'pointer',
  },
  // Lista de Itens
  itemsList: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #EEE',
  },
  itemDetails: {
    flexGrow: 1,
  },
  itemName: {
    fontWeight: 'bold',
    color: '#000000',
  },
  itemQuantity: {
    fontSize: '12px',
    marginLeft: '5px',
    color: '#666',
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#000000',
    marginRight: '10px',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#000000', // Preto
  },
  // Rodapé do Menu
  footer: {
    padding: '20px',
    borderTop: '2px solid #000000',
    backgroundColor: '#F5F5F5', // Cinza claro para destaque
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#000000',
  },
  totalAmount: {
    color: '#FFD700', // Dourado para o valor total
  },
  checkoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000000', // Preto
    color: '#FFD700', // Dourado
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  clearButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#FFFFFF', // Branco
    color: '#000000', // Preto
    border: '1px solid #000000',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default CartMenu;