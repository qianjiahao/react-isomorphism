import superagent from 'superagent'

export default function fetch(url) {
  return new Promise((resolve, reject) => {

    superagent.get(url)
      .end((err, html) => {
        if(err) reject(err)

        resolve(html.text)
      })
  })
}
