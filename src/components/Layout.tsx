import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { WhatsAppFab } from './WhatsAppFab'

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="grain" aria-hidden="true" />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
