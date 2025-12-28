import { useState } from 'react'
import useSmartPrice from '../hooks/useSmartPrice'

export default function SmartBooking({ carId }) {
  const [date, setDate] = useState('')
  const [hours, setHours] = useState(1)
  const price = useSmartPrice(date, hours, carId)

  return (
    <div className="p-4 bg-gray-800 rounded text-white space-y-2">
      <input type="datetime-local" onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-700" />
      <input type="number" min="1" max="24" value={hours} onChange={e => setHours(Number(e.target.value))} className="w-full px-3 py-2 rounded bg-gray-700" />
      {price && (
        <div className="text-yellow-400 font-semibold">
          Total: ${price.total} ({price.multiplier}x)
        </div>
      )}
    </div>
  )
}
