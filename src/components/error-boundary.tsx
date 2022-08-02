import React, { ReactNode } from 'react';

class ErrorBoundary extends React.Component<{ children: ReactNode }> {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('[Error boundary] ', error, errorInfo);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export default ErrorBoundary;
