import morgan from 'morgan'
import path from 'path'
import nconf from 'nconf'
import express from 'express'

let viewsPath = path.join(__dirname, '../', 'template')

export default function (app) {
  app.use(morgan('dev'))
  app.set('views', viewsPath);
  app.set('view engine', 'ejs');

  nconf.get('public').map((v) => {
    app.use(express.static(path.resolve(__dirname, '../../', v)))
  })

}
