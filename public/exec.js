const socket = io('http://localhost:3000')

socket.on('Server-send-reg-fail', () => {
  alert('Dang ki that bai. \nTen nguoi dung da duoc su dung!!!')
})

socket.on('Server-send-reg-success', (data) => {
  $('#username').text(data)
  $('.loginForm').hide(1000)
  $('.chatForm').show(1000)
})

socket.on('Server-send-list-user', (data) => {
  $('#boxContent').html('')
  data.forEach((i) => {
    $('#boxContent').append('<div>' + i + '</div>')
  })
})

socket.on('Server-res-chat', (data) => {
  $('#listMessage').append('<div>' + data + '</div>')
})

socket.on('Server-res-chatting', (data) => {
  $('#key').html(data + '<img width="30px" src="ellipse-dots.gif">')
})

socket.on('Server-res-notchatting', (data) => {
  $('#key').html('')
})

$(document).ready(() => {
  $('.loginForm').show()
  $('.chatForm').hide()

  $('#btnRegister').click(() => {
    socket.emit('User-send-name', $('#txtLogin').val())
    $('#txtLogin').val('')
  })

  $('#btnLogout').click(() => {
    socket.emit('logout')
    $('.chatForm').hide(1000)
    $('.loginForm').show(1000)
  })

  $('#btnSend').click(() => {
    socket.emit('User-chat', $('#txtMessage').val())
    $('#txtMessage').val('')
  })

  $('#txtMessage').focusin(() => {
    socket.emit('User-is-chatting')
  })

  $('#txtMessage').focusout(() => {
    socket.emit('User-isnot-chatting')
  })
})
