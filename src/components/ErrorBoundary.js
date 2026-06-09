import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Diagnóstico Azure — erro:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F7FA', padding: '2rem' }}>
          <div style={{ background: '#fff', border: '1px solid #F0A8A0', borderRadius: 16, padding: '2rem', maxWidth: 420, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1B3A5C', marginBottom: 8 }}>Algo deu errado</h2>
            <p style={{ fontSize: 14, color: '#5A6A7A', marginBottom: 12 }}>
              Ocorreu um erro inesperado. Suas respostas anteriores podem ter sido perdidas.
            </p>
            <p style={{ fontSize: 11, color: '#C0392B', background: '#FFF0EE', borderRadius: 6, padding: '8px 10px', marginBottom: 24, textAlign: 'left', wordBreak: 'break-word', fontFamily: 'monospace' }}>
              {this.state.error?.message || 'Erro desconhecido'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#1B3A5C', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              Reiniciar diagnóstico
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
