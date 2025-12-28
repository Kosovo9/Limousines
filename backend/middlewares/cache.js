import redis from 'redis'
const client = redis.createClient({ url: process.env.REDIS_URL })
await client.connect()

export const cache = (ttl = 30) => async (req, res, next) => {
  const key = `route:${req.originalUrl}`
  const cached = await client.get(key)
  if (cached) return res.json(JSON.parse(cached))
  res.jsonAndCache = (data) => {
    client.setEx(key, ttl, JSON.stringify(data))
    res.json(data)
  }
  next()
}
