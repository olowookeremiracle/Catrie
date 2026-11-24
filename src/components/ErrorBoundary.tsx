import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Catrie]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh items-center justify-center bg-cream px-6 text-center text-chocolate">
          <div className="max-w-md">
            <p className="label">Something went wrong</p>
            <h1 className="mt-5 font-display text-[clamp(32px,5vw,48px)] font-light leading-[1.05]">
              The kitchen dropped a plate.
            </h1>
            <p className="mt-4 text-[15px] leading-[1.7] text-ink-muted">
              Refresh the page and everything should be back on the counter.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Refresh
              </button>
              <Link to="/" className="btn-secondary">
                Back home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
