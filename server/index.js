import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
  // cors: {
  //   origin: 'http://localhost:5173',
  // }

})

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', {
      body: msg,
      id: socket.id.slice(6)
    })
  })
})


server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000')
})
