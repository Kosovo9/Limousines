import express from 'express'
import Unit from '../models/Unit.js'

const router = express.Router()

// list by type (white-pages)
router.get('/:type', async (req, res) => {
  const list = await Unit.find({ type: req.params.type, active: true }).populate('packages')
  res.json(list)
})

// public profile
router.get('/unit/:id', async (req, res) => {
  const unit = await Unit.findById(req.params.id).populate('packages')
  res.json(unit)
})

// owner: create unit
router.post('/', async (req, res) => {
  const unit = await Unit.create(req.body)
  res.json(unit)
})

export default router
