// frontend/src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// URL base do seu backend (ajuste se necessário, ex: 'http://localhost:3000')
const API_BASE_URL = 'http://localhost:3000/api'; 

// 1. Criação do Contexto
export const AuthContext = createContext();

// Hook customizado para fácil acesso ao contexto em qualquer componente
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. Componente Provedor (Provider)
export const AuthProvider = ({ children }) => {
  // O estado 'user' pode ser nulo (deslogado) ou conter os dados do usuário
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tenta carregar o usuário do armazenamento local (para persistência)
  useEffect(() => {
    const storedUser = localStorage.getItem('ourobranco_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  // --- Função de Login ---
  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/usuario/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      // Verifica se o backend retornou sucesso e os dados do usuário
      if (response.ok) {
        // Assume que o backend retorna um objeto de usuário (ex: { id: 1, nome: 'Cliente X', tipo: 'cliente' })
        const userData = data.user; 
        
        setUser(userData);
        // Armazena no localStorage para manter o login após refresh
        localStorage.setItem('ourobranco_user', JSON.stringify(userData)); 

        setLoading(false);
        return { success: true, user: userData };
      } else {
        // Se a resposta não for OK (ex: 401 Unauthorized)
        setLoading(false);
        return { success: false, message: data.message || 'Credenciais inválidas.' };
      }

    } catch (error) {
      console.error('Erro ao tentar login:', error);
      setLoading(false);
      return { success: false, message: 'Erro de conexão com o servidor.' };
    }
  };


  // --- Função de Logout ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ourobranco_user');
  };


  // 3. Objeto de valor para o Contexto
  const contextValue = {
    user,
    isAuthenticated: !!user, // Booleano: true se houver um usuário logado
    login,
    logout,
    loading,
  };

  if (loading) {
    // Pode retornar um spinner de carregamento aqui, se desejar
    return <div style={{ textAlign: 'center', color: '#000' }}>Carregando sessão...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Lembre-se de importar e usar o 'useAuth' nos seus componentes!
// Exemplo: const { user, login } = useAuth();