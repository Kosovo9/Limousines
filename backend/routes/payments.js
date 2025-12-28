import express from 'express'
import fetch from 'node-fetch'
import jwt from 'jose'

const router = express.Router()

// Mercado Pago – preference creation
router.post('/mp', async (req, res) => {
  const { amount, bookingId } = req.body
  const preference = {
    items: [{
      title: 'Limo Ride',
      quantity: 1,
      currency_id: 'USD',
      unit_price: amount
    }],
    external_reference: bookingId,
    back_urls: {
      success: `${process.env.FRONTEND_URL}/success`,
      failure: `${process.env.FRONTEND_URL}/failure`,
      pending: `${process.env.FRONTEND_URL}/pending`
    },
    auto_return: 'approved'
  }
  const rsp = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
    },
    body: JSON.stringify(preference)
  })
  const data = await rsp.json()
  res.json({ initPoint: data.init_point })
})

// PayPal – order creation (sandbox)
router.post('/paypal', async (req, res) => {
  const { amount, bookingId } = req.body
  const order = {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: { currency_code: 'USD', value: amount },
      reference_id: bookingId
    }]
  }
  const auth = Buffer.from(`${process.env.PP_CLIENT}:${process.env.PP_SECRET}`).toString('base64')
  const rsp = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`
    },
    body: JSON.stringify(order)
  })
  const data = await rsp.json()
  res.json({ orderId: data.id })
})

export default router
