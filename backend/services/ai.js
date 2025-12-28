import Limousine from '../models/Limousine.js'
import Booking from '../models/Booking.js'

// Simple demand prediction: look at bookings for the same day (0-24h) in the past 4 weeks
export async function predictDemand(date, hours) {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(end.getDate() + 1)

  const history = await Booking.aggregate([
    { $match: { date: { $gte: start, $lt: end } } },
    { $group: { _id: '$hours', count: { $sum: 1 } } },
  ])

  const base = await Limousine.countDocuments({ available: true })
  const ratio = history.find((h) => h._id === hours)?.count || 0
  return Math.min(2, 1 + ratio / base) // multiplier between 1‑2x
}
