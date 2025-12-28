import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import redis from 'redis'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import path from 'node:path'
import sharp from 'sharp'
import authRoutes from './routes/auth.js'
import limoRoutes from './routes/limousines.js'
import bookingRoutes from './routes/bookings.js'
import { authMiddleware } from './middlewares/auth.js'
import analyticsRoutes from './routes/analytics.js'
import reviewRoutes from './routes/reviews.js'
import paymentRoutes from './routes/payments.js'
import unitRoutes from './routes/units.js'
import aiRoutes from './routes/ai.js'
import i18nRoutes from './routes/i18n.js'
import { train as trainAI } from './ai/train.js'

import cors from 'cors' // Ensure this is installed
import { createServer } from 'http' // For graceful shutdown

const app = express()

// Quantum Resilience: Redis Connection
const redisClient = redis.createClient({ 
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000)
  }
})
redisClient.on('error', (err) => console.error('Redis Client Error', err))
await redisClient.connect().catch(console.error)

// Quantum Security: CORS & Helmet
app.use(helmet())
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'https://limousines-app.netlify.app'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
app.use(compression({ level: 11, brotli: { quality: 11 } }))
app.use(express.json())

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// ... existing AVIF code ...
// AVIF on‑the‑fly conversion & caching
app.get('/img/:name', async (req, res, next) => {
  const key = `img:${req.params.name}`
  try {
    if (redisClient.isOpen) {
      const cached = await redisClient.getBuffer(key)
      if (cached) return res.type('avif').send(cached)
    }

    const file = path.resolve('public', req.params.name.replace(/\..+/, '.jpg'))
    const avif = await sharp(file)
      .resize(1280, 720, { fit: 'inside' })
      .avif({ quality: 60, effort: 6 })
      .toBuffer()
    
    if (redisClient.isOpen) {
      await redisClient.setEx(key, 3600, avif)
    }
    res.type('avif').send(avif)
  } catch (e) {
    next()
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/limousines', limoRoutes)
app.use('/api/bookings', authMiddleware, bookingRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/units', unitRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/i18n', i18nRoutes)

// Train AI on boot
trainAI().catch(console.error)

// SSR shell for Antigravity
app.get('/shell', (_req, res) => {
  res.sendFile(path.resolve('public', 'index.html'))
})

// Quantum Datastore: MongoDB
try {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  console.log('✅ MongoDB Connected')
} catch (err) {
  console.error('❌ MongoDB Connection Error:', err.message)
  process.exit(1)
}

const server = app.listen(process.env.PORT || 5000, () => console.log(`🚀 API 500% ready on port ${process.env.PORT || 5000}`))

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed')
      redisClient.quit()
      process.exit(0)
    })
  })
})
