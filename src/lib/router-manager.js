import { renderToString } from 'react-dom/server'
import React from 'react'
import { match, RouterContext } from 'react-router'
import routes from '../views/routes.js'

export default function (app) {
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
}
