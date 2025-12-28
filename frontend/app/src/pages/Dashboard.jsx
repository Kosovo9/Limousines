import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </div>
  )
}
