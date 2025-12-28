import express from 'express'
import { getTopLimos, getMonthlyRevenue, getDriverRatings } from '../services/supabase.js'
import { authMiddleware } from '../middlewares/auth.js'

const router = express.Router()

router.get('/top-limos', authMiddleware, async (_req, res) => {
  const data = await getTopLimos()
  res.json(data)
})

router.get('/monthly-revenue', authMiddleware, async (_req, res) => {
  const data = await getMonthlyRevenue()
  res.json(data)
})

router.get('/driver-ratings/:driverId', authMiddleware, async (req, res) => {
  const data = await getDriverRatings(req.params.driverId)
  res.json(data)
})

export default router
