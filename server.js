const express = require('express')
const app = express()
const port = 3000

const server = require('http').Server(app)
// const { Server } = require('socket.io')
// const io = new Server(server)
const io = require('socket.io')(server)

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('trangchu')
})

const userarr = ['']
io.on('connection', (socket) => {
  console.log('a user connect ' + socket.id)

  socket.on('disconnect', function () {
    console.log(socket.id + 'is disconnected!!!')
  })

  socket.on('User-send-name', (data) => {
    console.log(data)

    if (userarr.indexOf(data) >= 0) {
      socket.emit('Server-send-reg-fail')
    } else {
      userarr.push(data)
      socket.Username = data
      socket.emit('Server-send-reg-success', data)
      io.sockets.emit('Server-send-list-user', userarr)
    }

    socket.on('logout', () => {
      console.log(userarr.indexOf(socket.Username) + ' is removed')
      userarr.splice(userarr.indexOf(socket.Username), 1)
      socket.broadcast.emit('Server-send-list-user', userarr)
    })

    socket.on('User-is-chatting', () => {
      console.log(socket.Username + ' dang go chu')
      io.sockets.emit('Server-res-chatting', socket.Username + ' is repping ')
    })

    socket.on('User-isnot-chatting', () => {
      console.log(socket.Username + ' khong gi chu')
      io.sockets.emit('Server-res-notchatting', '')
    })

    socket.on('User-chat', (data) => {
      console.log(socket.id + ' send: ' + data)
      io.sockets.emit('Server-res-chat', socket.Username + ': ' + data)
    })

    // Gui lai nguoi vua gui
    // socket.emit('Server-send-username', data)

    // Gui lai tat ca moi nguoi dang ket noi
    // io.sockets.emit('Server-send-data', data)

    // Gui lai nguoi khac tru nguoi gui
    // socket.broadcast.emit('Server-send-data', `Client ${socket.id} send: ` + data)

    // Gui den nguoi cu the
    // io.to('SGW-toRMKdB13PBqAAAD').emit('Server-send-data', `Client ${socket.id} send: ` + data)
  })
})

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening http://localhost:3000`)
})
