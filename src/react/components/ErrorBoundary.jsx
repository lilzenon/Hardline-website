import React from 'react';

/**
 * Error Boundary Component for graceful error handling
 * Prevents third-party script errors from crashing the entire app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Track error in analytics if available
    if (window.analyticsBeacon && window.analyticsBeacon.isEnabled()) {
      window.analyticsBeacon.sendEvent({
        event: 'error_boundary_triggered',
        properties: {
          error_message: error.message,
          error_stack: error.stack,
          component_stack: errorInfo.componentStack
        }
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#000',
          color: '#FFF',
          fontFamily: 'Inter, sans-serif',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#FF453A' }}>
            Something went wrong
          </h2>
          <p style={{ marginBottom: '20px', opacity: 0.8 }}>
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#319DFF',
              color: '#FFF',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Refresh Page
          </button>
          {true && (
            <details style={{ marginTop: '20px', textAlign: 'left', maxWidth: '800px' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '10px', color: '#888' }}>
                Show Error Details (Click to copy)
              </summary>
              <div style={{
                background: '#1a1a1a',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #333',
                fontSize: '12px',
                overflow: 'auto',
                maxHeight: '400px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'monospace',
                color: '#ff6b6b'
              }}>
                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  {this.state.error && this.state.error.toString()}
                </p>
                <div style={{ color: '#888' }}>
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </div>
              </div>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
