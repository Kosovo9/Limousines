import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Browse() {
  const { type } = useParams() // limo | party | armored ...
  const [units, setUnits] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/units/${type}`)
      .then(r => r.json())
      .then(setUnits)
  }, [type])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 capitalize">{type} Units</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {units.map(u => (
          <div key={u._id} className="bg-gray-800 rounded-xl overflow-hidden">
            <img src={u.images[0]} alt={u.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{u.title}</h2>
              <p className="text-sm text-gray-400">{u.city}</p>
              <div className="mt-2 flex gap-2">
                {u.packages.map(p => (
                  <span key={p._id} className="bg-yellow-400 text-black px-2 py-1 rounded text-xs">
                    {p.name} ${p.price}
                  </span>
                ))}
              </div>
              <a href={`/unit/${u._id}`} className="mt-4 inline-block bg-white text-black px-4 py-2 rounded">
                Ver paquetes
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
