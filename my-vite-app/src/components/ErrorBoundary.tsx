import React, { Component, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/joy';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReset = () => {
    // Reset state to try rendering children again.
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography level="h4">Something went wrong.</Typography>
          <Typography level="body-md" sx={{ my: 2 }}>
            An unexpected error occurred. Please re-enter your information or try again.
          </Typography>
          <Button onClick={this.handleReset} variant="outlined">
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
