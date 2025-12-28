import express from 'express'
import Review from '../models/Review.js'
import { storeReview } from '../services/reviewIPFS.js'
import { authMiddleware } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
  const { booking, rating, comment } = req.body
  const ipfsHash = await storeReview({ user: req.user.sub, booking, rating, comment })
  const review = await Review.create({ user: req.user.sub, booking, rating, comment, ipfsHash })
  res.json(review)
})

router.get('/', async (_req, res) => {
  const list = await Review.find().populate('user', 'email').lean()
  res.json(list)
})

export default router
