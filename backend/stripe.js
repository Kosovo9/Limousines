import Stripe from 'stripe'
export const stripe = Stripe(process.env.STRIPE_SECRET)

export async function createPaymentIntent(amount, bookingId) {
  return stripe.paymentIntents.create({
    amount: amount * 100, // cents
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: { bookingId },
  })
}
