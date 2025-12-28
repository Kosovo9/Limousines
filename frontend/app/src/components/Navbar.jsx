import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LanguageSelector from './LanguageSelector'

export default function Navbar() {
  const { user } = useAuth()

  if (!user) return <Outlet />

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link to="/dashboard" className="text-xl font-bold tracking-tighter">LiMo</Link>
          <div className="h-6 w-px bg-white/20 mx-2"></div>
          <Link to="/dashboard" className="hover:text-white/80 transition-colors">Dashboard</Link>
          <Link to="/bookings" className="hover:text-white/80 transition-colors">Bookings</Link>
          <Link to="/profile" className="hover:text-white/80 transition-colors">Profile</Link>
        </div>
        <LanguageSelector />
      </nav>
      <div className="h-20"></div> {/* Spacer for fixed navbar */}
      <Outlet />
    </>
  )
}
