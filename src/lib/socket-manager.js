import debug from 'debug'

export default function (server) {
  const io = require('socket.io')(server)

  io.on('connection', (socket) => {
    debug('app')('client socket connected')
  })
}
