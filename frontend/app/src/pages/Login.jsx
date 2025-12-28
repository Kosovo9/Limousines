import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      nav('/dashboard')
    } catch {
      alert('Login failed')
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-900 text-white">
      <form onSubmit={handle} className="w-full max-sm:px-4 sm:w-80 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full px-4 py-2 rounded bg-gray-800" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full px-4 py-2 rounded bg-gray-800" />
        <button className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition">Sign In</button>
      </form>
    </div>
  )
}
