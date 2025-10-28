// frontend/src/pages/NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Página Não Encontrada</h2>
      <p style={styles.text}>
        O recurso que você tentou acessar não existe ou foi removido.
      </p>
      <Link to="/" style={styles.button}>
        Voltar para a Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px 20px',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '120px',
    margin: 0,
    color: '#000000',
    lineHeight: 1,
  },
  subtitle: {
    fontSize: '36px',
    color: '#FFD700', // Dourado
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '30px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#000000', // Preto
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '4px',
  },
};

export default NotFoundPage;