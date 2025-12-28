import express from 'express'
import { predictDemand } from '../services/ai.js'
import Limousine from '../models/Limousine.js'
import Booking from '../models/Booking.js'

const router = express.Router()

// Existing routes (keep unchanged) – we will append new smart route below
// ... (original routes are assumed to be present)

router.post('/smart', async (req, res) => {
  const { limousine, date, hours } = req.body
  const multiplier = await predictDemand(date, hours)
  const car = await Limousine.findById(limousine)
  if (!car) return res.status(400).json({ msg: 'Invalid limousine' })
  const total = Math.round(car.pricePerHour * hours * multiplier)
  res.json({ total, multiplier, message: multiplier > 1.5 ? 'High demand period' : 'Standard rate' })
})

export default router
