import express from 'express'
import Booking from '../models/Booking.js'
import Review from '../models/Review.js'

const router = express.Router()

// KPI generales
router.get('/kpi', async (_req, res) => {
  const [bookings, revenue, avgRating] = await Promise.all([
    Booking.countDocuments(),
    Booking.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
    Review.aggregate([{ $group: { _id: null, avg: { $avg: '$rating' } } }]),
  ])
  res.json({ bookings, revenue: revenue[0]?.total || 0, avgRating: avgRating[0]?.avg || 0 })
})

// demanda por hora (para gráfico)
router.get('/demand', async (_req, res) => {
  const data = await Booking.aggregate([
    { $group: { _id: { $hour: '$date' }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ])
  res.json(data)
})

export default router
