import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface for diagnostics; never crash the page.
    console.error("ErrorBoundary caught:", error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="mx-auto max-w-3xl px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Something went wrong loading this section.
            </h1>
            <p className="mt-3 text-muted-foreground">
              Please refresh the page. If this keeps happening, try again in a
              moment.
            </p>
            <a
              href="/s"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground"
            >
              Browse pools →
            </a>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
