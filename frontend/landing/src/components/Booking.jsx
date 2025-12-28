import { useState } from 'react'

export default function Booking() {
  const [form, setForm] = useState({ name: '', date: '', time: '', car: 'Royal Stretch' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(import.meta.env.VITE_API + '/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then((r) => r.ok && alert('Booking received!'))
  }

  return (
    <section id="booking" className="py-16 bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Instant Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full name" required className="w-full px-4 py-2 rounded bg-gray-800" onChange={handleChange} />
          <input name="date" type="date" required className="w-full px-4 py-2 rounded bg-gray-800" onChange={handleChange} />
          <input name="time" type="time" required className="w-full px-4 py-2 rounded bg-gray-800" onChange={handleChange} />
          <select name="car" className="w-full px-4 py-2 rounded bg-gray-800" onChange={handleChange}>
            <option>Royal Stretch</option>
            <option>Executive SUV</option>
            <option>Party Bus</option>
          </select>
          <button className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition">
            Reserve Now
          </button>
        </form>
      </div>
    </section>
  )
}
