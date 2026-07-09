
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
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-offwhite flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-white p-10 rounded-[3rem] shadow-2xl border border-chocolate/5">
            <h2 className="text-3xl font-serif text-chocolate mb-6 uppercase tracking-tighter">Algo salió mal</h2>
            <p className="text-chocolate/70 mb-8 leading-relaxed">
              Lo sentimos, ha ocurrido un error inesperado. Estamos trabajando para solucionarlo.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-10 py-4 bg-accent-aqua text-white rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-lg shadow-accent-aqua/20"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
