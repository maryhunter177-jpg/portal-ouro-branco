// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Se o usuário já estiver logado, redireciona para a página inicial ou catálogo
  if (isAuthenticated) {
    navigate('/catalogo', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Chama a função de login do AuthContext
    const result = await login(username, password);

    if (result.success) {
      // Redireciona para o catálogo ou home após o login
      navigate('/catalogo', { replace: true });
    } else {
      // Exibe a mensagem de erro retornada pelo contexto
      setError(result.message || 'Erro de autenticação. Tente novamente.');
    }
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Acesso Ouro Branco</h2>
        <p style={styles.subtitle}>Entre com suas credenciais de cliente ou funcionário.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <label htmlFor="username" style={styles.label}>Usuário / E-mail</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
            disabled={isLoading}
          />

          <label htmlFor="password" style={styles.label}>Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            disabled={isLoading}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Conectando...' : 'Entrar'}
          </button>
        </form>

        <div style={styles.linkContainer}>
            <a href="/recuperar-senha" style={styles.forgotPassword}>Esqueceu sua senha?</a>
            <a href="/cadastro" style={styles.registerLink}>Cadastre-se</a>
        </div>
      </div>
    </div>
  );
};

// --- Estilos da Página de Login (Preto, Dourado e Branco) ---

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#F7F7F7', // Fundo levemente cinza
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #000000',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    color: '#000000',
    fontSize: '28px',
    marginBottom: '5px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '30px',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  label: {
    color: '#000000',
    fontWeight: 'bold',
    marginTop: '15px',
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    border: '1px solid #000000',
    borderRadius: '4px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    backgroundColor: '#FFEEEE',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    padding: '12px',
    backgroundColor: '#000000', // Preto
    color: '#FFD700', // Dourado
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'opacity 0.2s',
  },
  linkContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
  },
  forgotPassword: {
    color: '#000000',
    textDecoration: 'none',
  },
  registerLink: {
    color: '#FFD700', // Dourado
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default LoginPage;