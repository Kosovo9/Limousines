import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Bookings() {
  const [list, setList] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    fetch(import.meta.env.VITE_API + '/bookings/me', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('at') },
    })
      .then((r) => r.json())
      .then(setList)
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
      {list.length === 0 && <p>No bookings yet.</p>}
      <ul className="space-y-2">
        {list.map((b) => (
          <li key={b._id} className="bg-gray-800 p-3 rounded">
            {b.car} – {new Date(b.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
