// frontend/src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Importe um ícone, se estiver usando uma biblioteca.
// Ex: import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  
  // Função que você precisará criar para abrir/fechar o menu lateral do carrinho
  const toggleCartMenu = () => {
    console.log("Toggle Cart Menu: Abrir/Fechar o CartMenu.jsx");
    // Em um cenário real, você usaria um estado global ou um prop drilling para isso.
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        {/* LOGO: Ouro Branco (Texto com Dourado) */}
        <Link to="/" style={styles.logoLink}>
          <span style={styles.logoTextBold}>OURO</span>
          <span style={styles.logoTextGold}> BRANCO</span>
        </Link>
        {/* Cliente da imagem (Simulando uma saudação simples) */}
        {isAuthenticated && (
            <span style={styles.clientLabel}>
                Cliente: {user.nome || user.type || 'Usuário'}
            </span>
        )}
      </div>

      {/* Navegação Principal */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/catalogo" style={styles.navLink}>Catálogo</Link>
        <Link to="/contato" style={styles.navLink}>Contato</Link>
      </nav>

      {/* Ícones de Acesso e Carrinho */}
      <div style={styles.actionIcons}>
        
        {/* Ícone de Acesso/Logout */}
        {isAuthenticated ? (
          <div style={styles.navItem} onClick={logout}>
            {/* Usar ícone de logout aqui */}
            <span style={styles.navIcon}>🚪</span> 
            <span style={styles.navText}>Sair</span>
          </div>
        ) : (
          <Link to="/acesso" style={styles.navItem}>
            {/* Usar ícone de usuário aqui */}
            <span style={styles.navIcon}>👤</span> 
            <span style={styles.navText}>Acesso</span>
          </Link>
        )}

        {/* Ícone do Carrinho */}
        <div style={{...styles.navItem, cursor: 'pointer'}} onClick={toggleCartMenu}>
          {/* Usar ícone de carrinho aqui */}
          <span style={styles.navIcon}>🛒</span>
          {/* Contador de Itens */}
          {totalItems > 0 && (
            <span style={styles.cartBadge}>{totalItems}</span>
          )}
        </div>
      </div>
    </header>
  );
};

// --- Estilos em JavaScript (Para cores Preto, Dourado e Branco) ---

const styles = {
  // Cabeçalho Principal: Fundo Branco, Separador Preto
  header: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: '10px 40px',
    borderBottom: '2px solid #000000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  // Logo
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  logoLink: {
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
  logoTextBold: {
    color: '#000000', // Preto
  },
  logoTextGold: {
    color: '#FFD700', // Dourado
  },
  clientLabel: {
    fontSize: '14px',
    color: '#333',
    paddingLeft: '10px',
    borderLeft: '1px solid #ccc',
  },
  // Navegação
  nav: {
    display: 'flex',
    gap: '30px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#000000',
    fontSize: '16px',
    fontWeight: '500',
    padding: '5px 0',
    position: 'relative',
  },
  // Ícones de Ação (Acesso, Carrinho)
  actionIcons: {
    display: 'flex',
    gap: '25px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#000000',
    cursor: 'pointer',
    position: 'relative',
    fontSize: '16px',
    fontWeight: '500',
  },
  navIcon: {
    fontSize: '18px',
    marginRight: '5px',
    // Ícones poderiam ser Dourados para destaque
    color: '#FFD700', 
  },
  navText: {
    color: '#000000',
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-15px',
    backgroundColor: '#000000', // Preto
    color: '#FFD700', // Dourado
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: 'bold',
  }
};

export default Header;