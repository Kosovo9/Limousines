import { createContext, useContext, useEffect, useState } from 'react'
import { jwtVerify } from 'jose'

const AuthCtx = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      const t = localStorage.getItem('at')
      if (!t) return
      try {
        const { payload } = await jwtVerify(t, new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET))
        setUser(payload)
      } catch {
        localStorage.removeItem('at')
      }
    })()
  }, [])

  const login = async (email, password) => {
    const res = await fetch(import.meta.env.VITE_API + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error('Invalid credentials')
    const { accessToken } = await res.json()
    localStorage.setItem('at', accessToken)
    const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET))
    setUser(payload)
  }

  const logout = () => {
    localStorage.removeItem('at')
    setUser(null)
  }

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
