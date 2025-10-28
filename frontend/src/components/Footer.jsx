// frontend/src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Coluna 1: Logo e Direitos Autorais */}
        <div style={styles.col}>
          <div style={styles.logoLink}>
            <span style={styles.logoTextBold}>OURO</span>
            <span style={styles.logoTextGold}> BRANCO</span>
          </div>
          <p style={styles.text}>
            Excelência em materiais.
          </p>
          <p style={styles.copy}>
            &copy; {new Date().getFullYear()} Ouro Branco. Todos os direitos reservados.
          </p>
        </div>

        {/* Coluna 2: Navegação Rápida */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Navegação</h4>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/catalogo" style={styles.link}>Catálogo</Link>
          <Link to="/acesso" style={styles.link}>Área de Acesso</Link>
        </div>

        {/* Coluna 3: Contato */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Fale Conosco</h4>
          <p style={styles.text}>Rua Exemplo, 123 - Cidade, Estado</p>
          <p style={styles.text}>Telefone: (00) 1234-5678</p>
          <p style={styles.text}>Email: contato@ourobranco.com.br</p>
        </div>
      </div>
    </footer>
  );
};

// --- Estilos do Footer (Preto, Dourado e Branco) ---

const styles = {
  // Footer Principal: Fundo Preto, Texto Dourado/Branco
  footer: {
    backgroundColor: '#000000', // Preto
    color: '#FFFFFF', // Branco
    padding: '40px 20px',
    marginTop: 'auto', // Garante que fique no final da página
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
  },
  col: {
    flex: 1,
    minWidth: '200px',
  },
  // Estilo do Logo (replicado do Header, mas em cores invertidas)
  logoLink: {
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: '700',
    display: 'block',
    marginBottom: '15px',
  },
  logoTextBold: {
    color: '#FFFFFF', // Branco
  },
  logoTextGold: {
    color: '#FFD700', // Dourado
  },
  colTitle: {
    fontSize: '18px',
    color: '#FFD700', // Dourado para o título
    marginBottom: '15px',
    borderBottom: '1px solid #333',
    paddingBottom: '5px',
  },
  text: {
    fontSize: '14px',
    color: '#CCCCCC',
    marginBottom: '5px',
  },
  copy: {
    fontSize: '12px',
    color: '#666666',
    marginTop: '20px',
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: '#FFFFFF',
    fontSize: '14px',
    marginBottom: '8px',
    transition: 'color 0.2s',
  }
};

export default Footer;