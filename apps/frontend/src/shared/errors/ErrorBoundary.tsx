import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from 'antd';
import { ServerCrash } from 'lucide-react';
import { PATH } from '@/shared/constants/routes';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Future hook point for Sentry, Datadog, LogRocket
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleReturnHome = () => {
    window.location.href = PATH.landing.home;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
          <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-8">
            <ServerCrash size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
            Unexpected application error
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md font-open-sans">
            Please refresh the page or return to the homepage to continue.
          </p>
          <div className="flex gap-4">
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={this.handleRefresh}
            >
              Refresh Page
            </Button>
            <Button
              type="default"
              size="large"
              onClick={this.handleReturnHome}
            >
              Return Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
