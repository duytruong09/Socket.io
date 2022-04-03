const { Socket } = require('dgram')
const express = require('express')
const app = express()
const port = 3000

const server = require('http').Server(app)
const { Server } = require('socket.io')
const io = new Server(server)
// const io = require("socket.io")(server)

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('trangchu')
})

io.on('connection', (socket) => {
  console.log('a user connect ' + socket.id)

  socket.on('disconnect', function () {
    console.log(socket.id + 'is disconnected!!!')
  })

  socket.on('Client-send-data', (data) => {
    console.log(socket.id + 'send: ' + data)

    // Gui lai nguoi vua gui
    // socket.emit('Server-send-data', `Client ${socket.id} send: ` + data)

    // Gui lai tat ca moi nguoi dang ket noi
    io.sockets.emit('Server-send-data', data)

    // Gui lai nguoi khac tru nguoi gui
    // socket.broadcast.emit('Server-send-data', `Client ${socket.id} send: ` + data)

    // Gui den nguoi cu the
    // io.to('SGW-toRMKdB13PBqAAAD').emit('Server-send-data', `Client ${socket.id} send: ` + data)
  })
})

server.listen(port, () => {
  console.log(`Server is listining http://localhost:${port}`)
})
