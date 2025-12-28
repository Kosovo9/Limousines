import express from 'express'
import Booking from '../models/Booking.js'
import { notify } from '../services/notify.js'

const router = express.Router()

// Mercado Pago
router.post('/mp', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['x-signature-id']
  if (!sig) return res.status(400).send('No sig')
  const body = JSON.parse(req.body)
  if (body.type === 'payment' && body.data.status === 'approved') {
    const bookingId = body.data.external_reference
    await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' })
    const booking = await Booking.findById(bookingId).populate('user')
    await notify(booking.user, {
      push: { title: 'Pago aprobado', body: 'Tu limo está confirmado' }
    })
  }
  res.sendStatus(204)
})

// PayPal
router.post('/paypal', async (req, res) => {
  const { orderId, bookingId } = req.body
  const auth = Buffer.from(`${process.env.PP_CLIENT}:${process.env.PP_SECRET}`).toString('base64')
  const rsp = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`
    }
  })
  if (!rsp.ok) return res.status(400).json({ msg: 'Capture failed' })
  await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' })
  const booking = await Booking.findById(bookingId).populate('user')
  await notify(booking.user, {
    push: { title: 'PayPal pagado', body: 'Tu limo está confirmado' }
  })
  res.json({ ok: true })
})

// Stripe (placeholder)
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event
  try {
    // const stripe = require('stripe')(process.env.STRIPE_SECRET)
    // event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET)
    event = JSON.parse(req.body) // mock until stripe is fully re-enabled
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
  if (event.type === 'payment_intent.succeeded') {
    const bookingId = event.data.object.metadata.bookingId
    await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' })
  }
  res.json({ received: true })
})

export default router
