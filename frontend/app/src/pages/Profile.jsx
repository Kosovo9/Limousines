import { useAuth } from '../hooks/useAuth'

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="mb-4">{user?.email}</p>
      <button onClick={logout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition">Logout</button>
    </div>
  )
}
