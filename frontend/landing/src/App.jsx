import { lazy, Suspense } from 'react'
const Hero = lazy(() => import('./components/Hero'))
const Fleet = lazy(() => import('./components/Fleet'))
const Booking = lazy(() => import('./components/Booking'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white grid place-items-center">Loading…</div>}>
      <Hero />
      <Fleet />
      <Booking />
      <Footer />
    </Suspense>
  )
}
