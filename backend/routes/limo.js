import express from 'express'
import Ride from '../core/models/Ride.js'

const router = express.Router()

// Specialized Quotes

// 1. XV Quote
router.post('/xv-quote', async (req, res) => {
  const { hours = 4, extras = [] } = req.body
  const base = 400 // USD base package (4h)
  const extraCost = extras.includes('dj') ? 100 : 0
  const total = base + extraCost
  res.json({ 
    total, 
    currency: 'USD', 
    includes: 'Luces violeta, red carpet, Spotify XV playlist, chofer de etiqueta' 
  })
})

// 2. Wedding Quote
router.post('/wedding-quote', async (req, res) => {
  const { hours = 3, champagne = true } = req.body
  const base = 350 // USD base package (3h)
  const extra = champagne ? 50 : 0
  const total = base + extra
  res.json({ 
    total, 
    currency: 'USD', 
    includes: 'Cinta blanca, arreglo floral, Champagne Don Perignon, "Just Married" sign' 
  })
})

// 3. Armored Quote
router.post('/armored-quote', async (req, res) => {
  const { distance, threatLevel } = req.body
  const multiplier = threatLevel === 'high' ? 2.5 : 2.0
  const ratePerKm = 5
  const total = Math.round(distance * ratePerKm * multiplier)
  res.json({ 
    total, 
    currency: 'USD', 
    includes: `Blindaje Nivel B4/5, Vidrio Balístico, Chofer Táctico (${threatLevel} risk profile)` 
  })
})

// 4. Bachelor/Bachelorette Quote
router.post('/bachelor-quote', async (req, res) => {
  const { hours, people } = req.body
  const base = 150 // per hour
  const total = base * hours
  res.json({ 
    total, 
    currency: 'USD', 
    includes: 'Barra libre premium, luces neón, sistema de sonido 2000W' 
  })
})

// Standard Ride Creation (Generic Limo)
router.post('/ride', async (req, res) => {
  try {
    const ride = await Ride.create({ ...req.body, serviceType: 'limo' })
    res.json(ride)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
