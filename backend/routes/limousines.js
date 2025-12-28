import express from 'express'
import Limousine from '../models/Limousine.js'
import { cache } from '../middlewares/cache.js'

const router = express.Router()

router.get('/', cache(60), async (_req, res) => {
  const list = await Limousine.find({ available: true }).lean()
  res.jsonAndCache(list)
})

export default router
