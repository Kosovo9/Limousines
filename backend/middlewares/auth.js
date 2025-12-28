import jwt from 'jose'

export const authMiddleware = async (req, res, next) => {
  const hdr = req.headers.authorization
  if (!hdr) return res.status(401).json({ msg: 'No token' })
  try {
    const { payload } = await jwt.jwtVerify(
      hdr.split(' ')[1],
      new TextEncoder().encode(process.env.JWT_SECRET)
    )
    req.user = payload
    next()
  } catch {
    res.status(401).json({ msg: 'Invalid token' })
  }
}
