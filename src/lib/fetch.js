import superagent from 'superagent'
import request from 'request'

export default function fetch(url) {
  return new Promise((resolve, reject) => {

    request(url, function (err, res, html) {
      if(err) {
        reject(err)
      } else if(res.statusCode !== 200) {
        reject(res.statusCode + ' ' + html)
      }

      resolve(html)
    })
  })
}
