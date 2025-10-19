import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#0b0d12',
          color: '#e6e9ef',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
            There was an error loading the portfolio. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #6ea8fe, #b388ff)',
              border: 'none',
              color: '#0a0a0a',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
