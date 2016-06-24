import { renderToString } from 'react-dom/server'
import React from 'react'
import { match, RouterContext } from 'react-router'
import routes from '../views/routes.js'
import fetch from '../lib/fetch.js'
import cheerio from 'cheerio'

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

  app.post('/search', (req, res) => {
    let startTime = new Date()
    let url = req.body.url
    console.log(url)
    const data = []
    fetch(url).then((result) => {
      const $ = cheerio.load(result)
      let sum = $('.search-result h3.mt0').children().text()

      $('.search-result section').each((k, ele) => {

        switch ($(ele).attr('class')) {
          case 'widget-question':
            data.push({
              title: $(ele).find('a').text(),
              href: 'https://segmentfault.com' + $(ele).find('a').attr('href'),
              excerpt: $(ele).find('.excerpt').text(),
              type: 'widget-question',
              done: $(ele).find('.label-success').text() === '' ? false : true
            })
            break;

          case 'widget-blog':
            data.push({
              title: $(ele).find('a').text(),
              href: 'https://segmentfault.com' + $(ele).find('a').attr('href'),
              excerpt: $(ele).find('.excerpt').text(),
              type: 'widget-blog',
            })
            break;

          case 'widget-user media':
            data.push({
              img: $(ele).find('img').attr('src'),
              href: 'https://segmentfault.com' + $(ele).find('.pull-left').attr('href'),
              username: $(ele).find('.media-body strong a').text(),
              muted: $(ele).find('.media-body .text-muted').text(),
              badge: $(ele).find('.media-body .badge--info').text(),
              type: 'widget-user media',
            })
        }
      })

      let endTime = new Date()
      res.json({
        data: data,
        sum: sum,
        time: endTime - startTime
      })
    }, (err) => {
      console.log(err)
    })

  })
}
