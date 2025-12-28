import express from 'express'
import jwt from 'jose'
import User from '../models/User.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password))) return res.status(401).json({ msg: 'Invalid' })

  const accessToken = await new jwt.SignJWT({ sub: user._id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))

  const refreshToken = await new jwt.SignJWT({ sub: user._id, version: user.refreshTokenVersion })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(process.env.JWT_REFRESH_SECRET))

  res.json({ accessToken, refreshToken })
})

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body
  try {
    const { payload } = await jwt.jwtVerify(refreshToken, new TextEncoder().encode(process.env.JWT_REFRESH_SECRET))
    const user = await User.findById(payload.sub)
    if (!user || user.refreshTokenVersion !== payload.version) throw new Error()
    const accessToken = await new jwt.SignJWT({ sub: user._id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('15m')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))
    res.json({ accessToken })
  } catch {
    res.status(401).json({ msg: 'Invalid refresh' })
  }
})

export default router
