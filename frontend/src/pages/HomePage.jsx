// frontend/src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={styles.container}>
      
      {/* 1. Área de Título/Saudação Principal */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>BEM-VINDO À <span style={styles.heroTitleGold}>OURO BRANCO</span></h1>
        <p style={styles.heroSubtitle}>Sua excelência em materiais e equipamentos de segurança e construção.</p>
        
        <div style={styles.buttonContainer}>
          
          {/* Botão Principal: Catálogo */}
          <Link to="/catalogo" style={styles.mainButton}>
            EXPLORAR CATÁLOGO
          </Link>

          {/* Botão Secundário: Acesso (Login) */}
          {isAuthenticated ? (
            <Link to="/acesso" style={styles.secondaryButton}>
               MINHA ÁREA
            </Link>
          ) : (
            <Link to="/acesso" style={styles.secondaryButton}>
               ÁREA DE ACESSO
            </Link>
          )}
        </div>
      </div>

      {/* 2. Seção de Destaque (Pode ser substituída por componentes de destaque de produto) */}
      <div style={styles.highlightSection}>
        <h2 style={styles.highlightTitle}>Qualidade, Confiança e Segurança.</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🛡️</span>
            <p style={styles.featureText}>Produtos Certificados</p>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>⏱️</span>
            <p style={styles.featureText}>Entrega Rápida</p>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>⭐</span>
            <p style={styles.featureText}>Melhores Fornecedores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Estilos da Página Inicial (Preto, Dourado e Branco) ---

const styles = {
  container: {
    padding: '0 40px',
    backgroundColor: '#FFFFFF',
    minHeight: '85vh',
  },
  // --- Hero Section (Destaque Principal) ---
  heroSection: {
    padding: '80px 0',
    textAlign: 'center',
    borderBottom: '2px solid #000000',
    marginBottom: '40px',
  },
  heroTitle: {
    fontSize: '48px',
    color: '#000000',
    marginBottom: '10px',
  },
  heroTitleGold: {
    color: '#FFD700', // Dourado
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
  },
  mainButton: {
    padding: '15px 30px',
    backgroundColor: '#000000', // Preto
    color: '#FFD700', // Dourado
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    border: '2px solid #000000',
    transition: 'background-color 0.2s, color 0.2s',
  },
  secondaryButton: {
    padding: '15px 30px',
    backgroundColor: '#FFFFFF', // Branco
    color: '#000000', // Preto
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    border: '2px solid #000000',
    transition: 'background-color 0.2s',
  },
  // --- Seção de Destaques ---
  highlightSection: {
    padding: '40px 0',
    textAlign: 'center',
  },
  highlightTitle: {
    fontSize: '30px',
    color: '#000000',
    marginBottom: '40px',
    borderBottom: '3px solid #FFD700',
    display: 'inline-block',
    paddingBottom: '5px',
  },
  featuresGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  featureItem: {
    width: '250px',
    padding: '20px',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '40px',
    color: '#FFD700', // Dourado
    display: 'block',
    marginBottom: '10px',
  },
  featureText: {
    color: '#000000',
    fontSize: '16px',
    fontWeight: 'bold',
  }
};

export default HomePage;