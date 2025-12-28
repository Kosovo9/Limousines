import { Server } from 'socket.io'
import { createServer } from 'http'

const httpServer = createServer()
const io = new Server(httpServer, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  socket.on('subscribe-driver', (driverId) => socket.join(`driver-${driverId}`))
  socket.on('location-update', ({ driverId, lat, lng }) => {
    socket.to(`driver-${driverId}`).emit('location', { lat, lng })
  })
})

httpServer.listen(4000, () => console.log('WebSocket server listening on port 4000'))
