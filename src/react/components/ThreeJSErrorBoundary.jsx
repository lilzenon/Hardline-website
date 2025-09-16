import React from 'react';

/**
 * Error Boundary specifically designed for Three.js components
 * Handles React Three Fiber compatibility issues and WebGL failures
 */
class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging
    console.error('🚨 Three.js Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });

    this.setState({
      error,
      errorInfo
    });

    // Report to error tracking service if available
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: `ThreeJS Error: ${error.message}`,
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      const { fallback: Fallback } = this.props;
      
      if (Fallback) {
        return <Fallback error={this.state.error} />;
      }

      // Default fallback with CSS animation
      return (
        <div 
          className="threejs-error-fallback"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
            backgroundSize: '20px 20px',
            animation: 'threeJSFallback 3s ease-in-out infinite alternate',
            zIndex: -1
          }}
        >
          <style>{`
            @keyframes threeJSFallback {
              0% { opacity: 0.8; filter: hue-rotate(0deg); }
              100% { opacity: 0.6; filter: hue-rotate(10deg); }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap Three.js components with error boundary
 * @param {React.Component} WrappedComponent - Component to wrap
 * @param {React.Component} FallbackComponent - Optional fallback component
 * @returns {React.Component} Wrapped component with error boundary
 */
export function withThreeJSErrorBoundary(WrappedComponent, FallbackComponent = null) {
  const WithErrorBoundary = (props) => (
    <ThreeJSErrorBoundary fallback={FallbackComponent}>
      <WrappedComponent {...props} />
    </ThreeJSErrorBoundary>
  );

  WithErrorBoundary.displayName = `withThreeJSErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithErrorBoundary;
}

export default ThreeJSErrorBoundary;
