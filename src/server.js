import express from 'express'
import path from 'path'
import morgan from 'morgan'
import nconf from 'nconf'
import debug from 'debug'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { match, RouterContext } from 'react-router'
import routes from './views/routes.js'

let viewsPath = path.join(__dirname, 'template')
let nconfPath = path.resolve(__dirname, 'config/default.json')

nconf.argv().env()
.file({ file: nconfPath })
.defaults({ ENV: 'development' })

const app = express()

app.use(morgan('dev'))
app.set('views', viewsPath);
app.set('view engine', 'ejs');

nconf.get('public').map((v) => {
  app.use(express.static(path.resolve(__dirname, '../', v)))
})

app.get('*', (req, res) => {
  match({ routes, location: req.url}, (err, redirect, props) => {
    if(err) {
      res.status(500).send(err.message)
    } else if(redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if(props) {
      const appHtml = renderToString(<RouterContext {...props} />)

      res.render('index', {
        appHtml: appHtml
      })
    } else {
      res.status(404).send('Not Found')
    }
  })
})

app.listen(nconf.get('port'), () => {
  debug('server')(`listen on ${nconf.get('host')}:${nconf.get('port')}`)
})
