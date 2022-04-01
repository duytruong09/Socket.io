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
  console.log('a user connect' + socket.id)
  socket.on('disconnect', function () {
    console.log(socket.id + 'is disconnected!!!')
  })
})

server.listen(port, () => {
  console.log(`Server is listining http://localhost:${port}`)
})
