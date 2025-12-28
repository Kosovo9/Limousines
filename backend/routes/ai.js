import express from 'express'
import { ask, learn } from '../ai/inference.js'
// Note: we reference inference.js for 'ask' but 'learn' function is in learn.js
// Fixing module import reference in line above to be cleaner
import { learn as learnFunc } from '../ai/learn.js' 

const router = express.Router()

router.post('/ask', async (req, res) => {
  const { text, lang } = req.body
  const reply = await ask({ text, lang })
  res.json(reply)
})

router.post('/learn', async (req, res) => {
  const { text, correctAnswer, lang } = req.body
  await learnFunc({ text, correctAnswer, lang })
  res.json({ ok: true })
})

export default router
