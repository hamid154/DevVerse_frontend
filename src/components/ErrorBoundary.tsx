import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-950 text-white p-6">
          <div className="max-w-xl rounded-xl border border-red-400/30 bg-red-500/10 p-6 text-red-100">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-sm mb-4">{this.state.error?.message || 'Unknown error occurred.'}</p>
            <p className="text-xs text-red-200">Please reload or check console for details.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
