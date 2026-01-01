import express from 'express'
import { ask } from '../ai/inference.js'
import { learn } from '../ai/learn.js'

const router = express.Router()

router.post('/ask', async (req, res) => {
  const { text, lang } = req.body
  const reply = await ask({ text, lang })
  res.json(reply)
})

router.post('/learn', async (req, res) => {
  const { text, correctAnswer, lang } = req.body
  await learn({ text, correctAnswer, lang })
  res.json({ ok: true })
})

export default router
