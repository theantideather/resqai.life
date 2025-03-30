import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Add error logging
console.log('Application initializing...');

// Try to import the App component
const loadApp = async () => {
  try {
    console.log('Loading App component...');
    // Dynamic import to catch import errors
    const { default: App } = await import('./App');
    const { AuthProvider } = await import('./components/auth/AuthProvider');
    
    console.log('Components loaded successfully');
    
    const container = document.getElementById('root');
    if (!container) {
      throw new Error('Root element not found');
    }
    
    try {
      console.log('Creating React root...');
      const root = createRoot(container);
      
      console.log('Rendering application...');
      root.render(
        <React.StrictMode>
          <ErrorBoundary>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ErrorBoundary>
        </React.StrictMode>
      );
      console.log('Application rendered successfully');
    } catch (error) {
      console.error('Failed to render application:', error);
      showErrorMessage(container, error);
    }
  } catch (error) {
    console.error('Failed to load application modules:', error);
    const container = document.getElementById('root');
    if (container) {
      showErrorMessage(container, error);
    }
  }
};

// Error boundary component to catch rendering errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null, info: React.ErrorInfo | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
    console.log('[ErrorBoundary] Initialized');
  }

  static getDerivedStateFromError(error: Error) {
    console.error('[ErrorBoundary] React Error caught in getDerivedStateFromError:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] React Error Boundary caught an error:', error);
    console.error('[ErrorBoundary] Component stack:', info.componentStack);
    this.setState({ info });
  }

  componentDidMount() {
    console.log('[ErrorBoundary] Mounted');
  }

  componentWillUnmount() {
    console.log('[ErrorBoundary] Unmounting');
  }

  render() {
    if (this.state.hasError) {
      console.log('[ErrorBoundary] Rendering error state');
      return (
        <div style={{ 
          padding: '20px', 
          background: '#000913',
          color: '#c7af8c', 
          fontFamily: 'monospace',
          border: '1px solid #c7af8c',
          margin: '30px',
          borderRadius: '4px',
        }}>
          <h1>Something went wrong</h1>
          <p>The application encountered an error:</p>
          <details open>
            <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>Error details</summary>
            <pre style={{ 
              background: '#101520', 
              padding: '15px', 
              overflow: 'auto',
              color: '#ff6b6b',
              borderRadius: '4px'
            }}>{this.state.error?.toString()}</pre>
            
            {this.state.info && (
              <div style={{ marginTop: '15px' }}>
                <h3>Component Stack:</h3>
                <pre style={{ 
                  background: '#101520', 
                  padding: '15px', 
                  overflow: 'auto',
                  color: '#eee',
                  borderRadius: '4px'
                }}>{this.state.info.componentStack}</pre>
              </div>
            )}
          </details>
          <p style={{ marginTop: '20px' }}>
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                background: '#c7af8c', 
                color: '#000913', 
                border: 'none', 
                padding: '10px 20px', 
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Reload Application
            </button>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Helper function to show error message
function showErrorMessage(container: HTMLElement, error: unknown) {
  console.log('Showing error message to user');
  container.innerHTML = `
    <div style="padding: 20px; background: #000913; color: #c7af8c; font-family: monospace; border: 1px solid #c7af8c; margin: 30px; border-radius: 4px;">
      <h1>Application Failed to Start</h1>
      <p>There was an error initializing the application:</p>
      <pre style="background: #101520; padding: 15px; overflow: auto; color: #ff6b6b; border-radius: 4px;">${error instanceof Error ? error.stack || error.message : String(error)}</pre>
      <p style="margin-top: 20px;">
        <button onclick="window.location.reload()" style="background: #c7af8c; color: #000913; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px;">
          Reload Application
        </button>
        <button onclick="window.location.href = '/debug.html'" style="background: transparent; color: #c7af8c; border: 1px solid #c7af8c; padding: 10px 20px; cursor: pointer; border-radius: 4px; margin-left: 10px;">
          Try Debug Mode
        </button>
      </p>
    </div>
  `;
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error || event.message);
  console.error('Error details:', {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
  const rootElement = document.getElementById('root');
  if (rootElement) {
    showErrorMessage(rootElement, event.error || event.message);
  }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    showErrorMessage(rootElement, event.reason || 'Unknown promise rejection');
  }
});

// Start the application
console.log('Starting application load...');
loadApp().catch(error => {
  console.error('Unhandled error during app initialization:', error);
});