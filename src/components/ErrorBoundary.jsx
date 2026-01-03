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
    // Always log errors - these are important
    console.error('❌ Error caught by boundary:', error);
    if (errorInfo) {
      console.error('Error info:', errorInfo);
    }
    if (error?.stack) {
      console.error('Error stack:', error.stack);
    }
  }

  render() {
    if (this.state.hasError) {
      // Always log when showing error UI
      console.error("❌ ErrorBoundary showing error UI");
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          color: '#333'
        }}>
          <h2 style={{ color: '#d32f2f', marginBottom: '10px' }}>⚠️ Something went wrong</h2>
          <p style={{ color: '#666', marginTop: '10px', marginBottom: '20px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reload Page
          </button>
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
            Check browser console (F12) for details
          </div>
        </div>
      );
    }

    // Only log in development
    if (import.meta.env.MODE === 'development') {
      console.log("✅ ErrorBoundary rendering children");
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

