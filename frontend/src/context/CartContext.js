// frontend/src/context/CartContext.js

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// 1. Criação do Contexto
export const CartContext = createContext();

// Hook customizado para fácil acesso
export const useCart = () => {
  return useContext(CartContext);
};

// 2. Componente Provedor (Provider)
export const CartProvider = ({ children }) => {
  // Estado para armazenar os produtos no carrinho
  // Estrutura: [{ produto: {}, quantidade: 1, id: '123' }, ...]
  const [cartItems, setCartItems] = useState(() => {
    // Tenta carregar o carrinho do armazenamento local ao iniciar
    const storedCart = localStorage.getItem('ourobranco_cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  
  // Estado para controlar se o menu lateral está aberto
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Efeito para persistir o carrinho no localStorage sempre que cartItems mudar
  useEffect(() => {
    localStorage.setItem('ourobranco_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- Funções Principais ---

  // Calcula o valor total do carrinho
  const calculateTotal = useCallback(() => {
    return cartItems.reduce((total, item) => 
      total + (item.produto.preco * item.quantidade), 0
    );
  }, [cartItems]);
  
  // Calcula a quantidade total de itens (contagem de produtos)
  const getTotalItemsCount = useCallback(() => {
      return cartItems.reduce((count, item) => count + item.quantidade, 0);
  }, [cartItems]);

  // Adiciona ou incrementa um produto no carrinho
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const exists = prevItems.find(item => item.produto.id === product.id);

      if (exists) {
        // Se o produto já existe, apenas atualiza a quantidade
        return prevItems.map(item =>
          item.produto.id === product.id
            ? { ...item, quantidade: item.quantidade + quantity }
            : item
        );
      } else {
        // Se é um novo produto, adiciona
        return [...prevItems, { produto: product, quantidade: quantity }];
      }
    });
    // Abre o menu do carrinho após adicionar um item
    setIsCartOpen(true); 
  };

  // Remove um item do carrinho
  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.produto.id !== productId)
    );
  };

  // Limpa o carrinho completamente (usado após a finalização da compra)
  const clearCart = () => {
    setCartItems([]);
  };

  // --- Funções de UI ---
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // 3. Objeto de valor para o Contexto
  const contextValue = {
    cartItems,
    isCartOpen,
    total: calculateTotal(),
    itemCount: getTotalItemsCount(),
    addToCart,
    removeFromCart,
    clearCart,
    toggleCart,
    setIsCartOpen,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};