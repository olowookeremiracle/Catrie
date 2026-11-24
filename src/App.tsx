import { Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { BookingProvider } from './context/BookingContext'
import { About } from './pages/About'
import { CakeDetail } from './pages/CakeDetail'
import { Cakes } from './pages/Cakes'
import { Categories } from './pages/Categories'
import { Contact } from './pages/Contact'
import { Forbidden } from './pages/Forbidden'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Policies } from './pages/Policies'

export default function App() {
  return (
    <ErrorBoundary>
      <BookingProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<Categories />} />
            <Route path="cakes" element={<Cakes />} />
            <Route path="cakes/:slug" element={<CakeDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="policies" element={<Policies />} />
            <Route path="403" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BookingProvider>
    </ErrorBoundary>
  )
}
