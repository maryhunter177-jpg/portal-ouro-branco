// frontend/src/pages/CheckoutPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// URL base do seu backend
const API_BASE_URL = 'http://localhost:3000/api'; 

const CheckoutPage = () => {
  const { cartItems, totalAmount, clearCart, getSalesOrderData } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redireciona se o carrinho estiver vazio
  if (cartItems.length === 0) {
    navigate('/catalogo');
    return null;
  }

  const handleDeliveryChange = (e) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Prepara os dados do pedido usando a função do CartContext
      const orderData = {
        cliente_id: user.id, // Assume que o ID do usuário está no AuthContext
        cliente_nome: user.name, // Nome do cliente
        info_entrega: deliveryInfo,
        metodo_pagamento: paymentMethod,
        // Itens e valor total formatados
        ...getSalesOrderData(), 
      };

      // 2. Faz o POST para o pedido-venda-routes.js
      const response = await fetch(`${API_BASE_URL}/pedido-venda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Você pode precisar enviar o token de autenticação aqui se o backend exigir:
          // 'Authorization': `Bearer ${user.token}` 
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao finalizar o pedido. Tente novamente.');
      }

      // 3. Sucesso: Limpa o carrinho e redireciona
      clearCart();
      setIsLoading(false);
      navigate('/pedido-confirmado', { state: { orderId: (await response.json()).pedido_id } });

    } catch (err) {
      console.error('Erro ao processar pedido:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Finalizar Compra</h1>

      <form onSubmit={handlePlaceOrder} style={styles.checkoutGrid}>
        
        {/* Coluna 1: Informações de Entrega e Pagamento */}
        <div style={styles.formCol}>
          <h2 style={styles.sectionTitle}>1. Endereço de Entrega</h2>
          
          {/* Campos de Endereço */}
          {['endereco', 'cidade', 'estado', 'cep'].map(field => (
            <div key={field}>
              <label htmlFor={field} style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                id={field}
                type="text"
                name={field}
                value={deliveryInfo[field]}
                onChange={handleDeliveryChange}
                style={styles.input}
                required
                disabled={isLoading}
              />
            </div>
          ))}

          <h2 style={styles.sectionTitle}>2. Método de Pagamento</h2>
          <div style={styles.paymentOptions}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="pix"
                checked={paymentMethod === 'pix'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              PIX
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="boleto"
                checked={paymentMethod === 'boleto'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Boleto Bancário
            </label>
          </div>
        </div>

        {/* Coluna 2: Resumo do Pedido e Botão Finalizar */}
        <div style={styles.summaryCol}>
          <h2 style={styles.sectionTitle}>Resumo do Pedido</h2>
          
          <div style={styles.itemsSummary}>
            {cartItems.map(item => (
              <div key={item.id} style={styles.summaryItem}>
                <span style={styles.summaryName}>{item.nome}</span>
                <span style={styles.summaryPrice}>
                  {item.quantity}x R$ {(item.preco || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>TOTAL FINAL:</span>
            <span style={styles.totalAmount}>R$ {totalAmount.toFixed(2)}</span>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading || cartItems.length === 0}
          >
            {isLoading ? 'Enviando Pedido...' : `Fazer Pedido - R$ ${totalAmount.toFixed(2)}`}
          </button>

          <p style={styles.note}>
            Ao clicar em "Fazer Pedido", você confirma a compra e concorda com nossos termos.
          </p>
        </div>
      </form>
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
    marginBottom: '30px',
    fontSize: '36px',
  },
  checkoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '40px',
  },
  formCol: {
    // Coluna do formulário de entrega e pagamento
  },
  summaryCol: {
    backgroundColor: '#F7F7F7',
    padding: '25px',
    border: '1px solid #000000',
    borderRadius: '8px',
  },
  sectionTitle: {
    color: '#000000',
    fontSize: '22px',
    borderBottom: '1px solid #E0E0E0',
    paddingBottom: '5px',
    marginTop: '20px',
    marginBottom: '15px',
  },
  label: {
    color: '#000000',
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #000000',
    borderRadius: '4px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  paymentOptions: {
    display: 'flex',
    gap: '20px',
    marginTop: '10px',
    color: '#000000',
  },
  radioLabel: {
    fontWeight: 'normal',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  // Resumo
  itemsSummary: {
    borderBottom: '1px dashed #DDD',
    paddingBottom: '15px',
    marginBottom: '15px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    padding: '5px 0',
  },
  summaryName: {
    color: '#333',
  },
  summaryPrice: {
    color: '#000000',
    fontWeight: 'bold',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderTop: '2px solid #000000',
    paddingTop: '15px',
  },
  totalLabel: {
    color: '#000000',
  },
  totalAmount: {
    color: '#FFD700', // Dourado
  },
  button: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#000000', // Preto
    color: '#FFD700', // Dourado
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    color: 'red',
    backgroundColor: '#FFEEEE',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  note: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'center',
    marginTop: '10px',
  }
};

export default CheckoutPage;