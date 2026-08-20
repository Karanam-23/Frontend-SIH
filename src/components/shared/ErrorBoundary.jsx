import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || 'Something went wrong while loading this screen.',
    };
  }

  componentDidCatch(error) {
    console.error('Application error boundary caught an error:', error);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    }
  };

  handleReturnHome = () => {
    this.setState({ hasError: false, errorMessage: '' });
    if (typeof this.props.onReturnHome === 'function') {
      this.props.onReturnHome();
      return;
    }
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-8">
          <div className="w-full max-w-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <div className="mb-5 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error-container text-on-error-container">
                <span className="material-symbols-outlined text-3xl">error</span>
              </div>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">Something went wrong</h1>
            <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
              {this.state.errorMessage || 'This page could not be loaded correctly.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleRetry}
                className="rounded-lg bg-secondary px-5 py-3 font-label-sm text-label-sm text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={this.handleReturnHome}
                className="rounded-lg border border-outline-variant px-5 py-3 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
