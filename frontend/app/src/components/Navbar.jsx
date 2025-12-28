import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { user } = useAuth()

  if (!user) return <Outlet />

  return (
    <>
      <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/bookings" className="hover:underline">Bookings</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </nav>
      <Outlet />
    </>
  )
}
