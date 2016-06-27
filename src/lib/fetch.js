import superagent from 'superagent'
import nconf from 'nconf'
import cheerio from 'cheerio'

export default function fetch(url) {
  return new Promise((resolve, reject) => {

    superagent.get(url)
      .end((err, html) => {
        if(err) reject(err)

        resolve(html.text)
      })
  })
}
