import React from "react";
import { ReactNode } from "react";

class ErrorBoundary extends React.Component<{ children: ReactNode }> {
  constructor(props) {
    super(props);
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
    return this.props.children;
  }
}

export default ErrorBoundary;