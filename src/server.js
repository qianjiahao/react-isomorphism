import express from 'express'
import path from 'path'
import nconf from 'nconf'
import debug from 'debug'

import socketManager from './lib/socket-manager.js'
import nconfManager from './lib/nconf-manager.js'
import serverManager from './lib/server-manager.js'
import routerManager from './lib/router-manager.js'

const app = express()
const server = require('http').createServer(app)

socketManager(server)
serverManager(app)
routerManager(app)

server.listen(nconf.get('port'), () => {
  debug('app')(`listen on ${nconf.get('host')}:${nconf.get('port')}`)
})
